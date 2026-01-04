import type { FirebotClient } from "./index";
import { ApiStatusResponse } from "./types/api";

export class ApiRoute {
    protected baseUrl: string;
    protected firebotClient: FirebotClient;

    constructor(firebotClient: FirebotClient, baseUrl: string) {
        this.firebotClient = firebotClient;
        this.baseUrl = baseUrl;
    }

    private async handleError(response: Response): Promise<Response> {
        if (!response.ok) {
            const errorData = await response.json() as ApiStatusResponse;
            throw new Error(errorData.message);
        }
        return response;
    }

    private async getRequest(endpoint: string): Promise<Response> {
        const response = await fetch(`${endpoint}`);
        return this.handleError(response);
    }

    /**
     * Performs an HTTP request to the specified endpoint with the given method and body.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param method - The HTTP method to use (e.g., "GET", "POST").
     * @param endpoint - The API endpoint to send the request to.
     * @param body - The request body for methods like POST (optional).
     * @returns {Promise<Response>} The response from the API.
     */
    protected async fetch(method: string, endpoint: string, body?: object): Promise<Response> {
        if (method === "GET") {
            return this.getRequest(endpoint);
        }

        const response = await fetch(`${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : undefined
        });

        return this.handleError(response);
    }
}