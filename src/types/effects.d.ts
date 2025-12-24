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