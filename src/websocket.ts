import { EventEmitter } from "events";
import { WebsocketEvents, WebsocketMessage } from "./types/websocket";
import WebSocket from "ws";

export class FirebotWebSocket {
    private _eventEmitter: EventEmitter;
    private _ws?: WebSocket;
    private _url: string;
    private _pingInterval?: NodeJS.Timeout;
    private _pongTimeout?: NodeJS.Timeout;
    private readonly _pingIntervalMs = 15_000;
    private readonly _pongTimeoutMs = 15_000;

    constructor(host: string, port: number, secure = false) {
        this._eventEmitter = new EventEmitter();
        const protocol = secure ? "wss" : "ws";
        this._url = `${protocol}://${host}:${port}`;
    }

    on<TKey extends keyof WebsocketEvents>(event: TKey, listener: (data: WebsocketEvents[TKey]) => void): void {
        this._eventEmitter.on(event as string, listener);
    }

    off<TKey extends keyof WebsocketEvents>(event: TKey, listener: (data: WebsocketEvents[TKey]) => void): void {
        this._eventEmitter.off(event as string, listener);
    }

    private emit<TKey extends keyof WebsocketEvents>(event: TKey, data: WebsocketEvents[TKey]): void {
        this._eventEmitter.emit(event as string, data);
    }

    private handleMessage(message: WebSocket.Data): void {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const stringMessage = message.toString();
        this.emit("message", stringMessage);
        const messageData = JSON.parse(stringMessage) as WebsocketMessage;

        if (messageData.type === "event") {
            this.emit(messageData.name, messageData.data);
            return;
        }

        if (messageData.type === "response") {
            if (messageData.id === 0 && messageData.name === "success") {
                this.emit("connected", undefined);
                this.startKeepAlive();
                return;
            }
            this.emit("response", { id: messageData.id, name: messageData.name, data: messageData.data });
        }
    }

    private handleOpen(): void {
        this.send("subscribe-events", {}, 0);
    }

    private handleClose(code: number, reason?: Buffer): void {
        this.stopKeepAlive();
        this.emit("disconnected", { code, reason: reason?.toString() });
    }

    private handleError(error: Error): void {
        this.emit("error", error);
    }

    connect(): void {
        if (this._ws) {
            this._ws.close(4001);
        }

        this._ws = new WebSocket(this._url)
            .on("open", this.handleOpen.bind(this))
            .on("message", this.handleMessage.bind(this))
            .on("pong", this.handlePong.bind(this))
            .on("close", this.handleClose.bind(this))
            .on("error", this.handleError.bind(this));
    }

    disconnect(): void {
        if (this._ws) {
            this._ws.close();
            this._ws.removeAllListeners();
            this._ws = undefined;
        }

        this.stopKeepAlive();
    }

    send(name: string, data?: object, id?: number | string) {
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        const message = {
            type: "invoke",
            name,
            id: id ?? crypto.randomUUID(),
            data: data ?? {}
        };
        this._ws.send(JSON.stringify(message));
    }

    private startKeepAlive(): void {
        this.stopKeepAlive();

        // Send the first ping immediately, then continue on the interval.
        this.sendPing();
        this._pingInterval = setInterval(() => this.sendPing(), this._pingIntervalMs);
    }

    private stopKeepAlive(): void {
        if (this._pingInterval) {
            clearInterval(this._pingInterval);
            this._pingInterval = undefined;
        }

        if (this._pongTimeout) {
            clearTimeout(this._pongTimeout);
            this._pongTimeout = undefined;
        }
    }

    private sendPing(): void {
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            return;
        }

        // Reset pong timer for this ping.
        if (this._pongTimeout) {
            clearTimeout(this._pongTimeout);
        }

        this._pongTimeout = setTimeout(() => this.handlePongTimeout(), this._pongTimeoutMs);
        this._ws.ping();
    }

    private handlePong(): void {
        if (this._pongTimeout) {
            clearTimeout(this._pongTimeout);
            this._pongTimeout = undefined;
        }
    }

    private handlePongTimeout(): void {
        this.emit("error", new Error("WebSocket pong timeout"));
        // Close with a specific code to indicate timeout.
        this._ws?.close(4002, "Pong timeout");
        this.stopKeepAlive();
    }
}