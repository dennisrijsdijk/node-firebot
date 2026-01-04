import type { EffectList } from "../types/effects";

export type SimpleTimer = {
    id: string;
    name: string;
    active: boolean;
};

export type Timer = {
    id: string;
    name: string;
    active: boolean;
    interval: number;
    requiredChatLines: number;
    onlyWhenLive: boolean;
    effects: EffectList;
    sortTags: string[];
};