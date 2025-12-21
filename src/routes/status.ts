import { ApiRoute } from "../api-route";

export type StatusResponse = {
    connections: {
        chat: boolean;
    };
};

export class StatusRoute extends ApiRoute {
    async getStatus(): Promise<StatusResponse> {
        return fetch(`${this.baseUrl}/status`).then(res => res.json()) as Promise<StatusResponse>;
    }
}