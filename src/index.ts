import { StatusRoute } from "./routes/status";
import { EffectsRoute } from "./routes/effects";
import { CommandsRoute } from "./routes/commands";
import { FontsRoute } from "./routes/fonts";
import { CustomVariablesRoute } from "./routes/custom-variables";
import { ReplaceVariablesRoute } from "./routes/replace-variables";
import { ViewersRoute } from "./routes/viewers";
import { CustomRolesRoute } from "./routes/custom-roles";
import { CurrencyRoute } from "./routes/currency";
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
    private _customVariablesRoute: CustomVariablesRoute;
    private _replaceVariablesRoute: ReplaceVariablesRoute;
    private _viewersRoute: ViewersRoute;
    private _customRolesRoute: CustomRolesRoute;
    private _currencyRoute: CurrencyRoute;

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

    get customVariables(): CustomVariablesRoute {
        return this._customVariablesRoute;
    }

    get replaceVariables(): ReplaceVariablesRoute {
        return this._replaceVariablesRoute;
    }

    get viewers(): ViewersRoute {
        return this._viewersRoute;
    }

    get customRoles(): CustomRolesRoute {
        return this._customRolesRoute;
    }

    get currency(): CurrencyRoute {
        return this._currencyRoute;
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
        this._customVariablesRoute = new CustomVariablesRoute(this, this.baseUrl);
        this._replaceVariablesRoute = new ReplaceVariablesRoute(this, this.baseUrl);
        this._viewersRoute = new ViewersRoute(this, this.baseUrl);
        this._customRolesRoute = new CustomRolesRoute(this, this.baseUrl);
        this._currencyRoute = new CurrencyRoute(this, this.baseUrl);
    }
}

export type { ApiRoute };