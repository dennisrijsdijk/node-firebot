import { ApiRoute } from "../api-route";

export type StatusResponse = {
    connections: {
        chat: boolean;
    };
};

export class StatusRoute extends ApiRoute {
    /**
     * Fetches the status of the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {StatusResponse} The status of the Firebot API.
     */
    async getStatus(): Promise<StatusResponse> {
        return this.fetch("GET", `${this.baseUrl}/status`).then(res => res.json()) as Promise<StatusResponse>;
    }
}