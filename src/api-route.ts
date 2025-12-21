import type { FirebotClient } from "./index";

export class ApiRoute {
    protected baseUrl: string;
    protected firebotClient: FirebotClient;

    constructor(firebotClient: FirebotClient, baseUrl: string) {
        this.firebotClient = firebotClient;
        this.baseUrl = baseUrl;
    }
}