import { ApiRoute } from "../api-route";
import { FirebotEffect, EffectList, RunEffectsMetadata, PresetEffectList } from "../types/effects";

export class EffectsRoute extends ApiRoute {
    /**
     * Fetches the list of effects from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {FirebotEffect[]} An array of effects.
     */
    async getEffects(): Promise<FirebotEffect[]> {
        return this.fetch("GET", `${this.baseUrl}/effects`).then(res => res.json()) as Promise<FirebotEffect[]>;
    }

    /**
     * Fetches a specific effect by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param effectId - The ID of the effect to retrieve.
     * @returns {FirebotEffect} The details of the specified effect.
     */
    async getEffect(effectId: string): Promise<FirebotEffect> {
        return this.fetch("GET", `${this.baseUrl}/effects/${effectId}`)
            .then(res => res.json()) as Promise<FirebotEffect>;
    }

    /**
     * Runs a list of effects with the provided metadata.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param effectList - The list of effects to run.
     * @param metadata - Metadata about the trigger for the effects.
     */
    async runEffects(effectList: EffectList, metadata: RunEffectsMetadata) {
        await this.fetch("POST", `${this.baseUrl}/effects`, {
            effects: effectList,
            triggerData: metadata
        });
    }

    /**
     * Fetches the list of preset effect lists from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {PresetEffectList[]} An array of preset effect lists.
     */
    async getPresetEffectLists(): Promise<PresetEffectList[]> {
        return this.fetch("GET", `${this.baseUrl}/effects/preset`).then(res => res.json()) as Promise<PresetEffectList[]>;
    }

    /**
     * Runs a preset effect list.
     * @param presetListId - The ID of the preset effect list to run.
     * @param waitForCompletion - Whether to wait for completion or continue immediately. Defaults to true.
     * @param args - Optional arguments to pass to the preset effect list.
     * @param username - Optional username of the user triggering the preset effect list.
     */
    async runPresetEffectList(presetListId: string, waitForCompletion: boolean = true, args?: Record<string, unknown>, username?: string) {
        await this.fetch("POST", `${this.baseUrl}/effects/preset/${presetListId}/${waitForCompletion ? "" : "run"}`, {
            username,
            args
        });
    }
}