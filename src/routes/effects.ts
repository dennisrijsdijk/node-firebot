import { ApiRoute } from "../api-route";
import { FirebotEffect, EffectList, RunEffectsMetadata, PresetEffectList } from "../types/effects";
import { ApiStatusResponse } from "../types/api";

export class EffectsRoute extends ApiRoute {
    /**
     * Fetches the list of effects from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {FirebotEffect[]} An array of effects.
     */
    async getEffects(): Promise<FirebotEffect[]> {
        return fetch(`${this.baseUrl}/effects`).then(res => res.json()) as Promise<FirebotEffect[]>;
    }

    /**
     * Fetches a specific effect by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param effectId - The ID of the effect to retrieve.
     * @returns {FirebotEffect} The details of the specified effect.
     */
    async getEffect(effectId: string): Promise<FirebotEffect> {
        const response = await fetch(`${this.baseUrl}/effects/${effectId}`).then(res => res.json()) as FirebotEffect | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Runs a list of effects with the provided metadata.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param effectList - The list of effects to run.
     * @param metadata - Metadata about the trigger for the effects.
     */
    async runEffects(effectList: EffectList, metadata: RunEffectsMetadata) {
        const response = await fetch(`${this.baseUrl}/effects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                effects: effectList,
                triggerData: metadata
            })
        }).then(res => res.json()) as ApiStatusResponse;

        if (response.status === "error") {
            throw new Error(response.message);
        }
    }

    /**
     * Fetches the list of preset effect lists from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {PresetEffectList[]} An array of preset effect lists.
     */
    async getPresetEffectLists(): Promise<PresetEffectList[]> {
        const response = await fetch(`${this.baseUrl}/effects/preset`).then(res => res.json()) as PresetEffectList[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Runs a preset effect list.
     * @param presetListId - The ID of the preset effect list to run.
     * @param waitForCompletion - Whether to wait for completion or continue immediately. Defaults to true.
     * @param args - Optional arguments to pass to the preset effect list.
     * @param username - Optional username of the user triggering the preset effect list.
     */
    async runPresetEffectList(presetListId: string, waitForCompletion: boolean = true, args?: Record<string, unknown>, username?: string) {
        const url = `${this.baseUrl}/effects/preset/${presetListId}/${waitForCompletion ? "" : "run"}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                args
            })
        }).then(res => res.json()) as ApiStatusResponse;

        if (response.status === "error") {
            throw new Error(response.message);
        }
    }
}