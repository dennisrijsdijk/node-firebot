import { ApiRoute } from "../api-route";
import { FirebotEffect, EffectList, RunEffectsMetadata, PresetEffectList } from "../types/effects";
import { ApiStatusResponse } from "../types/api";

export class EffectsRoute extends ApiRoute {
    async getEffects(): Promise<FirebotEffect[]> {
        return fetch(`${this.baseUrl}/effects`).then(res => res.json()) as Promise<FirebotEffect[]>;
    }

    async getEffect(effectId: string): Promise<FirebotEffect> {
        const response = await fetch(`${this.baseUrl}/effects/${effectId}`).then(res => res.json()) as FirebotEffect | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

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

    async getPresetEffectLists(): Promise<PresetEffectList[]> {
        const response = await fetch(`${this.baseUrl}/effects/preset`).then(res => res.json()) as PresetEffectList[] | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

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