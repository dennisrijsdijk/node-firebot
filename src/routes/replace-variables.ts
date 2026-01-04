import { ApiRoute } from "../api-route";
import { ReplaceVariable } from "../types/replace-variables";

export class ReplaceVariablesRoute extends ApiRoute {
    /**
     * Fetches the list of replace variables from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {ReplaceVariable[]} An array of replace variables.
     */
    async getReplaceVariables(): Promise<ReplaceVariable[]> {
        return this.fetch("GET", `${this.baseUrl}/variables`).then(res => res.json()) as Promise<ReplaceVariable[]>;
    }
}