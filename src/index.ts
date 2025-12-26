import { StatusRoute } from "./routes/status";
import { EffectsRoute } from "./routes/effects";
import { CommandsRoute } from "./routes/commands";
import { FontsRoute } from "./routes/fonts";
import type { ApiRoute } from "./api-route";

export class FirebotClient {
    private host: string;
    private port: number;
    private baseUrl: string;

    // routes
    private _statusRoute: StatusRoute;
    private _effectsRoute: EffectsRoute;
    private _commandsRoute: CommandsRoute;
    private _fontsRoute: FontsRoute;

    get status(): StatusRoute {
        return this._statusRoute;
    }

    get effects(): EffectsRoute {
        return this._effectsRoute;
    }

    get commands(): CommandsRoute {
        return this._commandsRoute;
    }

    get fonts(): FontsRoute {
        return this._fontsRoute;
    }

    constructor(host: string, port: number = 7472, secure = false) {
        if (!host || typeof host !== "string" || host.trim() === "") {
            throw new Error("Invalid host");
        }
        if (typeof port !== "number" || port <= 0 || port >= 65536) {
            throw new Error("Invalid port number");
        }
        this.host = host;
        this.port = port;
        this.baseUrl = `http${secure ? "s" : ""}://${this.host}:${this.port}/api/v1`;

        // initialize routes
        this._statusRoute = new StatusRoute(this, this.baseUrl);
        this._effectsRoute = new EffectsRoute(this, this.baseUrl);
        this._commandsRoute = new CommandsRoute(this, this.baseUrl);
        this._fontsRoute = new FontsRoute(this, this.baseUrl);
    }
}

export type { ApiRoute };