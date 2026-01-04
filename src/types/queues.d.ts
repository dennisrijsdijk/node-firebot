type QueueMode = "auto" | "interval" | "custom" | "manual";

export type EffectQueueConfig = {
    id: string;
    name: string;
    mode: QueueMode;
    interval?: number;
    sortTags: string[];
    active: boolean;
    runEffectsImmediatelyWhenPaused: boolean;
    length: number;
};