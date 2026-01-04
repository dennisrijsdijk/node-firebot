import { CommandsRoute } from "./routes/commands";
import { CountersRoute } from "./routes/counters";
import { CurrencyRoute } from "./routes/currency";
import { CustomRolesRoute } from "./routes/custom-roles";
import { CustomVariablesRoute } from "./routes/custom-variables";
import { EffectsRoute } from "./routes/effects";
import { FontsRoute } from "./routes/fonts";
import { QueuesRoute } from "./routes/queues";
import { QuotesRoute } from "./routes/quotes";
import { ReplaceVariablesRoute } from "./routes/replace-variables";
import { StatusRoute } from "./routes/status";
import { TimersRoute } from "./routes/timers";
import { ViewersRoute } from "./routes/viewers";
import { FirebotWebSocket } from "./websocket";
import type { ApiRoute } from "./api-route";

export class FirebotClient {
    private host: string;
    private port: number;
    private baseUrl: string;

    // routes
    private _commandsRoute: CommandsRoute;
    private _countersRoute: CountersRoute;
    private _currencyRoute: CurrencyRoute;
    private _customRolesRoute: CustomRolesRoute;
    private _customVariablesRoute: CustomVariablesRoute;
    private _effectsRoute: EffectsRoute;
    private _fontsRoute: FontsRoute;
    private _queuesRoute: QueuesRoute;
    private _quotesRoute: QuotesRoute;
    private _replaceVariablesRoute: ReplaceVariablesRoute;
    private _statusRoute: StatusRoute;
    private _timersRoute: TimersRoute;
    private _viewersRoute: ViewersRoute;

    private _ws: FirebotWebSocket;

    get commands(): CommandsRoute {
        return this._commandsRoute;
    }

    get counters(): CountersRoute {
        return this._countersRoute;
    }

    get currency(): CurrencyRoute {
        return this._currencyRoute;
    }

    get customRoles(): CustomRolesRoute {
        return this._customRolesRoute;
    }

    get customVariables(): CustomVariablesRoute {
        return this._customVariablesRoute;
    }

    get effects(): EffectsRoute {
        return this._effectsRoute;
    }

    get fonts(): FontsRoute {
        return this._fontsRoute;
    }

    get queues(): QueuesRoute {
        return this._queuesRoute;
    }

    get quotes(): QuotesRoute {
        return this._quotesRoute;
    }

    get replaceVariables(): ReplaceVariablesRoute {
        return this._replaceVariablesRoute;
    }

    get status(): StatusRoute {
        return this._statusRoute;
    }

    get timers(): TimersRoute {
        return this._timersRoute;
    }

    get viewers(): ViewersRoute {
        return this._viewersRoute;
    }

    get websocket(): FirebotWebSocket {
        return this._ws;
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
        this._commandsRoute = new CommandsRoute(this, this.baseUrl);
        this._countersRoute = new CountersRoute(this, this.baseUrl);
        this._currencyRoute = new CurrencyRoute(this, this.baseUrl);
        this._customRolesRoute = new CustomRolesRoute(this, this.baseUrl);
        this._customVariablesRoute = new CustomVariablesRoute(this, this.baseUrl);
        this._effectsRoute = new EffectsRoute(this, this.baseUrl);
        this._fontsRoute = new FontsRoute(this, this.baseUrl);
        this._queuesRoute = new QueuesRoute(this, this.baseUrl);
        this._quotesRoute = new QuotesRoute(this, this.baseUrl);
        this._replaceVariablesRoute = new ReplaceVariablesRoute(this, this.baseUrl);
        this._statusRoute = new StatusRoute(this, this.baseUrl);
        this._timersRoute = new TimersRoute(this, this.baseUrl);
        this._viewersRoute = new ViewersRoute(this, this.baseUrl);

        this._ws = new FirebotWebSocket(this.host, this.port, secure);
    }
}

export type { ApiRoute };