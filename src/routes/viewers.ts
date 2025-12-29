import { ApiRoute } from "../api-route";
import { ApiStatusResponse } from "../types/api";
import { BasicViewer, ExportViewer, SpecificViewer, ViewerCustomRole } from "../types/viewers";

export class ViewersRoute extends ApiRoute {
    /**
     * Fetches a list of basic viewer information from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {BasicViewer[]} An array of basic viewer information.
     */
    getViewers(): Promise<BasicViewer[]> {
        return fetch(`${this.baseUrl}/viewers`).then(res => res.json()) as Promise<BasicViewer[]>;
    }

    /**
     * Fetches a specific viewer by their ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to retrieve.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     * @returns {SpecificViewer} The details of the specified viewer.
     */
    async getViewer(viewerIdOrUsername: string, useViewerId: boolean = true): Promise<SpecificViewer> {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}?username=${!useViewerId}`).then(res => res.json() as Promise<SpecificViewer | ApiStatusResponse>);

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Fetches a list of viewers with export information from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {ExportViewer[]} An array of viewers with export information.
     */
    exportViewers(): Promise<ExportViewer[]> {
        return fetch(`${this.baseUrl}/viewers/export`).then(res => res.json()) as Promise<ExportViewer[]>;
    }

    /**
     * Sets a metadata key and value for a specific viewer in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to set metadata for.
     * @param key - The metadata key to set.
     * @param value - The metadata value to set.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async setViewerMetadata(viewerIdOrUsername: string, key: string, value: string, useViewerId: boolean = true) {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/metadata/${encodeURIComponent(key)}?username=${!useViewerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: value })
        });

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message || `Failed to set metadata for viewer: ${viewerIdOrUsername}`);
        }
    }

    /**
     * Deletes a metadata key for a specific viewer in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to delete metadata for.
     * @param key - The metadata key to delete.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async deleteViewerMetadata(viewerIdOrUsername: string, key: string, useViewerId: boolean = true) {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/metadata/${encodeURIComponent(key)}?username=${!useViewerId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message || `Failed to delete metadata for viewer: ${viewerIdOrUsername}`);
        }
    }

    /**
     * Fetches the currency balances for a specific viewer from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to retrieve currencies for.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     * @returns {Record<string, number>} A record of currency IDs and their corresponding balances.
     */
    async getViewerCurrencies(viewerIdOrUsername: string, useViewerId: boolean = true): Promise<Record<string, number>> {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/currencies?username=${!useViewerId}`).then(res => res.json() as Promise<Record<string, number> | ApiStatusResponse>);

        if ("status" in response && response.status === "error") {
            throw new Error((response as ApiStatusResponse).message);
        }

        return response as Record<string, number>;
    }

    /**
     * Fetches the balance of a specific currency for a specific viewer from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to retrieve the currency balance for.
     * @param currencyId - The ID of the currency to retrieve.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     * @returns {number} The balance of the specified currency for the viewer.
     */
    async getViewerCurrency(viewerIdOrUsername: string, currencyId: string, useViewerId: boolean = true): Promise<number> {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/currencies/${encodeURIComponent(currencyId)}?username=${!useViewerId}`).then(res => res.json() as Promise<number | ApiStatusResponse>);

        if (typeof response === "object") {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Sets or adjusts the balance of a specific currency for a specific viewer in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to set the currency for.
     * @param currencyId - The ID of the currency to set.
     * @param amount - The amount to set or adjust the currency by.
     * @param mode - The mode of operation, either "set" to set the amount or "adjust" to adjust the amount.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async setViewerCurrency(viewerIdOrUsername: string, currencyId: string, amount: number, mode: "set" | "adjust", useViewerId: boolean = true) {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/currencies/${encodeURIComponent(currencyId)}?username=${!useViewerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount, setAmount: mode === "set" })
        });

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message || `Failed to set currency for viewer: ${viewerIdOrUsername}`);
        }
    }

    /**
     * Fetches the custom roles assigned to a specific viewer from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to retrieve custom roles for.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     * @returns {ViewerCustomRole[]} An array of custom roles assigned to the viewer.
     */
    async getViewerCustomRoles(viewerIdOrUsername: string, useViewerId: boolean = true): Promise<ViewerCustomRole[]> {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/customRoles?username=${!useViewerId}`).then(res => res.json() as Promise<ViewerCustomRole[] | ApiStatusResponse>);

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Adds a viewer to a custom role in the Firebot API.
     * @param viewerIdOrUsername - The ID or username of the viewer to add to the custom role.
     * @param roleId - The ID of the custom role to add the viewer to.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async addViewerToCustomRole(viewerIdOrUsername: string, roleId: string, useViewerId: boolean = true) {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/customRoles/${encodeURIComponent(roleId)}?username=${!useViewerId}`, {
            method: "POST"
        });

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message);
        }
    }

    /**
     * Removes a viewer from a custom role in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to remove from the custom role.
     * @param roleId - The ID of the custom role to remove the viewer from.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async removeViewerFromCustomRole(viewerIdOrUsername: string, roleId: string, useViewerId: boolean = true) {
        const response = await fetch(`${this.baseUrl}/viewers/${encodeURIComponent(viewerIdOrUsername)}/customRoles/${encodeURIComponent(roleId)}?username=${!useViewerId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message);
        }
    }
}