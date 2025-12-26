import { ApiRoute } from "../api-route";

type FirebotCustomVariable = {
    t: number;
    v?: string | number | boolean | Record<string, unknown> | Array<unknown>;
    meta: {
        persist?: boolean;
    };
};

export type CustomVariable = {
    name: string;
    data?: string | number | boolean | Record<string, unknown> | Array<unknown>;
    ttl: number;
    persist: boolean;
};

export class CustomVariablesRoute extends ApiRoute {
    /**
     * Fetches all custom variables from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {CustomVariable[]} An array of custom variables.
     */
    async getCustomVariables(): Promise<CustomVariable[]> {
        const response = await fetch(`${this.baseUrl}/custom-variables`).then(res => res.json()) as Record<string, FirebotCustomVariable>;
        return Object.entries(response).map(([name, variable]) => ({
            name,
            data: variable.v,
            ttl: variable.t,
            persist: !!variable.meta.persist
        }));
    }

    /**
     * Fetches a specific custom variable by its name from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param variableName - The name of the custom variable to retrieve.
     * @returns {T} The data of the specified custom variable.
     */
    getCustomVariable<T>(variableName: string): Promise<T> {
        return fetch(`${this.baseUrl}/custom-variables/${encodeURIComponent(variableName)}`).then(res => res.json()) as Promise<T>;
    }

    /**
     * Sets a custom variable in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param variableName - The name of the custom variable to set.
     * @param data - The data to set for the custom variable.
     * @param ttl - The time-to-live (TTL) in seconds for the custom variable. Defaults to no expiration.
     */
    async setCustomVariable(variableName: string, data: string | number | boolean | Record<string, unknown> | Array<unknown>, ttl?: number) {
        const body = {
            data,
            ttl
        };

        const response = await fetch(`${this.baseUrl}/custom-variables/${encodeURIComponent(variableName)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to set custom variable: ${variableName} (${response.statusText})`);
        }
    }
}