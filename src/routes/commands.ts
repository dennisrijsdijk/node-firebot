import { ApiRoute } from "../api-route";
import { CustomCommand, CommandDefinition, SystemCommand } from "../types/commands";
import { MetadataWithUsername } from "../types/api";

export class CommandsRoute extends ApiRoute {
    private async getCommands(type: "custom" | "system"): Promise<CustomCommand[] | SystemCommand[]> {
        return this.fetch("GET", `${this.baseUrl}/commands/${type}`)
            .then(res => res.json()) as Promise<CustomCommand[] | SystemCommand[]>;
    }

    private async getCommand(type: "custom" | "system", commandId: string): Promise<CommandDefinition> {
        return this.fetch("GET", `${this.baseUrl}/commands/${type}/${commandId}`)
            .then(res => res.json()) as Promise<CommandDefinition>;
    }

    private async runCommand(commandType: "custom" | "system", commandId: string, args?: string, metadata?: MetadataWithUsername): Promise<void> {
        await this.fetch("POST", `${this.baseUrl}/commands/${commandType}/${commandId}/run`, {
            args: args,
            metadata: metadata
        });
    }

    /**
     * Fetches the list of custom commands from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {CustomCommand[]} An array of custom commands.
     */
    async getCustomCommands(): Promise<CustomCommand[]> {
        return this.getCommands("custom") as Promise<CustomCommand[]>;
    }

    /**
     * Fetches a specific custom command by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the custom command to retrieve.
     * @returns {CommandDefinition} The details of the specified custom command.
     */
    async getCustomCommand(commandId: string): Promise<CommandDefinition> {
        return this.getCommand("custom", commandId);
    }

    /**
     * Fetches the list of system commands from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {SystemCommand[]} An array of system commands.
     */
    async getSystemCommands(): Promise<SystemCommand[]> {
        return this.getCommands("system") as Promise<SystemCommand[]>;
    }

    /**
     * Fetches a specific system command by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param commandId - The ID of the system command to retrieve.
     * @returns {CommandDefinition} The details of the specified system command.
     */
    async getSystemCommand(commandId: string): Promise<CommandDefinition> {
        return this.getCommand("system", commandId);
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
        return this.runCommand("custom", commandId, args, metadata);
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
        return this.runCommand("system", commandId, args, metadata);
    }
}