import { ApiRoute } from "../api-route";
import { CustomCommand, CommandDefinition, SystemCommand } from "../types/commands";
import { ApiStatusResponse, MetadataWithUsername } from "../types/api";

export class CommandsRoute extends ApiRoute {
    async getCustomCommands(): Promise<CustomCommand[]> {
        const response = await fetch(`${this.baseUrl}/commands/custom`).then(res => res.json()) as CustomCommand[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    async getCustomCommand(commandId: string): Promise<CommandDefinition> {
        const response = await fetch(`${this.baseUrl}/commands/custom/${commandId}`).then(res => res.json()) as CommandDefinition | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    async getSystemCommands(): Promise<SystemCommand[]> {
        const response = await fetch(`${this.baseUrl}/commands/system`).then(res => res.json()) as SystemCommand[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    async getSystemCommand(commandId: string): Promise<CommandDefinition> {
        const response = await fetch(`${this.baseUrl}/commands/system/${commandId}`).then(res => res.json()) as CommandDefinition | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

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