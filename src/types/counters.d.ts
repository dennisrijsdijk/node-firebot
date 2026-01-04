import type { EffectList } from "./effects";

export type SimpleCounter = {
    id: string;
    name: string;
    value: number;
};

export type Counter = {
    id: string;
    name: string;
    value: number;
    saveToTxtFile: boolean;
    minimum?: number;
    maximum?: number;
    updateEffects?: EffectList;
    minimumEffects?: EffectList;
    maximumEffects?: EffectList;
};

export type UpdateCounterResponse = {
    oldValue: number;
    newValue: number;
};