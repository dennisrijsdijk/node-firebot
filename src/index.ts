import { StatusRoute } from "./routes/status";

export class FirebotClient {
    private host: string;
    private port: number;
    private baseUrl: string;

    // routes
    private _statusRoute: StatusRoute;

    get status(): StatusRoute {
        return this._statusRoute;
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
    }
}
