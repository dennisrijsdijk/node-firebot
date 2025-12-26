import { ApiRoute } from "../api-route";
import { CustomCommand, CommandDefinition, SystemCommand } from "../types/commands";
import { ApiStatusResponse, MetadataWithUsername } from "../types/api";

export class CommandsRoute extends ApiRoute {
    /**
     * Fetches the list of custom commands from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {CustomCommand[]} An array of custom commands.
     */
    async getCustomCommands(): Promise<CustomCommand[]> {
        const response = await fetch(`${this.baseUrl}/commands/custom`).then(res => res.json()) as CustomCommand[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Fetches a specific custom command by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the custom command to retrieve.
     * @returns {CommandDefinition} The details of the specified custom command.
     */
    async getCustomCommand(commandId: string): Promise<CommandDefinition> {
        const response = await fetch(`${this.baseUrl}/commands/custom/${commandId}`).then(res => res.json()) as CommandDefinition | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Fetches the list of system commands from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {SystemCommand[]} An array of system commands.
     */
    async getSystemCommands(): Promise<SystemCommand[]> {
        const response = await fetch(`${this.baseUrl}/commands/system`).then(res => res.json()) as SystemCommand[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Fetches a specific system command by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the system command to retrieve.
     * @returns {CommandDefinition} The details of the specified system command.
     */
    async getSystemCommand(commandId: string): Promise<CommandDefinition> {
        const response = await fetch(`${this.baseUrl}/commands/system/${commandId}`).then(res => res.json()) as CommandDefinition | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Runs a custom command by its ID with optional arguments and metadata.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the custom command to run.
     * @param args - Optional arguments to pass to the command.
     * @param metadata - Optional metadata including username information.
     */
    async runCustomCommand(commandId: string, args?: string, metadata?: MetadataWithUsername): Promise<void> {
        const response = await fetch(`${this.baseUrl}/commands/custom/${commandId}/run`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                args: args,
                metadata: metadata
            })
        }).then(res => res.json()) as ApiStatusResponse;

        if (response.status === "error") {
            throw new Error(response.message);
        }
    }

    /**
     * Runs a system command by its ID with optional arguments and metadata.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the system command to run.
     * @param args - Optional arguments to pass to the command.
     * @param metadata - Optional metadata including username information.
     */
    async runSystemCommand(commandId: string, args?: string, metadata?: MetadataWithUsername): Promise<void> {
        const response = await fetch(`${this.baseUrl}/commands/system/${commandId}/run`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                args: args,
                metadata: metadata
            })
        }).then(res => res.json()) as ApiStatusResponse;

        if (response.status === "error") {
            throw new Error(response.message);
        }
    }
}