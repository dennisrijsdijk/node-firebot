import { ApiRoute } from "../api-route";
import { CustomRole } from "../types/custom-roles";

export class CustomRolesRoute extends ApiRoute {
    /**
     * Fetches the list of custom roles from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {CustomRole[]} An array of custom roles.
     */
    async getCustomRoles(): Promise<CustomRole[]> {
        return this.fetch("GET", `${this.baseUrl}/customRoles`)
            .then(res => res.json()) as Promise<CustomRole[]>;
    }

    /**
     * Fetches a specific custom role by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param roleId - The ID of the custom role to retrieve.
     * @returns {CustomRole} The details of the specified custom role.
     */
    async getCustomRoleById(roleId: string): Promise<CustomRole> {
        return this.fetch("GET", `${this.baseUrl}/customRoles/${roleId}`)
            .then(res => res.json()) as Promise<CustomRole>;
    }

    /**
     * Clears all viewers from a specific custom role in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param roleId - The ID of the custom role to clear viewers from.
     */
    async clearCustomRoleViewers(roleId: string) {
        await this.fetch("GET", `${this.baseUrl}/customRoles/${roleId}/clear`);
    }

    /**
     * Adds a viewer to a specific custom role in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to add to the custom role.
     * @param roleId - The ID of the custom role to add the viewer to.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async addViewerToCustomRole(viewerIdOrUsername: string, roleId: string, useViewerId: boolean = true) {
        await this.fetch("POST", `${this.baseUrl}/customRoles/${roleId}/viewer/${encodeURIComponent(viewerIdOrUsername)}?username=${!useViewerId}`);
    }

    /**
     * Removes a viewer from a specific custom role in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param viewerIdOrUsername - The ID or username of the viewer to remove from the custom role.
     * @param roleId - The ID of the custom role to remove the viewer from.
     * @param useViewerId - Set to true to indicate that viewerIdOrUsername is an ID. False for username. Defaults to true.
     */
    async removeViewerFromCustomRole(viewerIdOrUsername: string, roleId: string, useViewerId: boolean = true) {
        await this.fetch("DELETE", `${this.baseUrl}/customRoles/${roleId}/viewer/${encodeURIComponent(viewerIdOrUsername)}?username=${!useViewerId}`);
    }
}