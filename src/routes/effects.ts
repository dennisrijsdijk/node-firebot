import { ApiRoute } from "../api-route";

export type EffectOutput = {
    label: string;
    description: string;
    defaultName: string;
};

export type TriggerType =
    | "command"
    | "custom_script"
    | "startup_script"
    | "api"
    | "event"
    | "hotkey"
    | "timer"
    | "scheduled_task"
    | "counter"
    | "preset"
    | "quick_action"
    | "manual"
    | "channel_reward"
    | "overlay_widget";

export type TriggersObject = {
    [T in TriggerType]?: T extends "event" ? string[] | boolean : boolean;
};

export type EffectCategory =
    | "common"
    | "twitch"
    | "moderation"
    | "chat based"
    | "dashboard"
    | "overlay"
    | "fun"
    | "integrations"
    | "firebot control"
    | "advanced"
    | "scripting";

export type EffectDependencies = {
    twitch?: boolean;
    integrations?: Record<string, boolean>;
};

export type FirebotEffect = {
    id: string;
    name: string;
    description: string;
    icon: string;
    categories: EffectCategory[];
    dependencies: EffectDependencies | Array<"chat">;
    hidden?: boolean;
    outputs?: EffectOutput[];
    keysExemptFromAutoVariableReplacement?: string[];
    exemptFromTimeouts?: boolean;
    exemptFromAsync?: boolean;
    isNoOp?: boolean;
    triggers?: TriggerType[] | TriggersObject;
};

export type EffectInstance = {
    id: string;
    type: string;
    effectLabel?: string | null;
    effectComment?: string | null;
    active?: boolean;
    abortTimeout?: number | null;
    percentWeight?: number | null;
    outputNames?: Record<string, string>;
    async?: boolean;
    [x: string]: unknown;
};

export type EffectList = {
    id: string;
    list: EffectInstance[];
    queue?: string | null;
    queuePriority?: "high" | "none";
    queueDuration?: number;
    runMode?: "all" | "random" | "sequential";
    weighted?: boolean;
    dontRepeatUntilAllUsed?: boolean;
};

export type PresetEffectList = {
    id: string;
    name: string;
    args: string[];
};

export type RunEffectsMetadata = {
    username?: string;
    [x: string]: unknown;
};

type ApiStatusResponse = {
    status: "success" | "error";
    message?: string;
};

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