import { CommandDefinition } from "./commands";
import { Counter } from "./counters";
import { WebsocketCustomRole } from "./custom-roles";
import { WebsocketCustomVariable } from "./custom-variables";
import { WebsocketPresetEffectList } from "./effects";
import { EffectQueueConfig } from "./queues";
import { WebsocketQuote } from "./quotes";
import { Timer } from "./timers";
import { ViewerMetadataUpdate } from "./viewers";

export type WebsocketEvents = {
    "command:created": CommandDefinition;
    "command:updated": CommandDefinition;
    "command:deleted": CommandDefinition;
    "counter:created": Counter;
    "counter:updated": Counter;
    "counter:deleted": Counter;
    "custom-role:created": WebsocketCustomRole;
    "custom-role:updated": WebsocketCustomRole;
    "custom-role:deleted": WebsocketCustomRole;
    "custom-variable:created": WebsocketCustomVariable;
    "custom-variable:updated": WebsocketCustomVariable;
    "custom-variable:deleted": WebsocketCustomVariable;
    "effect-queue:created": EffectQueueConfig;
    "effect-queue:updated": EffectQueueConfig;
    "effect-queue:deleted": EffectQueueConfig;
    "effect-queue:length-updated": { id: string, length: number };
    "preset-effect-list:created": WebsocketPresetEffectList;
    "preset-effect-list:updated": WebsocketPresetEffectList;
    "preset-effect-list:deleted": WebsocketPresetEffectList;
    "quote:created": WebsocketQuote;
    "quote:updated": WebsocketQuote;
    "quote:deleted": WebsocketQuote;
    "timer:created": Timer;
    "timer:updated": Timer;
    "timer:deleted": Timer;
    "viewer-metadata:created": ViewerMetadataUpdate;
    "viewer-metadata:updated": ViewerMetadataUpdate;
    "viewer-metadata:deleted": ViewerMetadataUpdate;
    "message": string;
    "response": { id: number | string, name: "error" | "success", data?: unknown };
    "connected": void;
    "disconnected": { code: number, reason?: string };
    "error": Error;
    [x: string]: unknown;
};

export type WebsocketBaseMessage = {
    type: string;
    id?: number | string;
    name: string;
    data?: unknown;
};

export type WebsocketInvokeMessage = WebsocketBaseMessage & {
    type: "invoke";
    id: number | string;
    data: unknown;
};

export type WebsocketResponseMessage = WebsocketBaseMessage & {
    type: "response";
    id: number | string;
    name: "error" | "success";
};

export type WebsocketEventMessage = WebsocketBaseMessage & {
    type: "event";
};

export type WebsocketMessage = WebsocketInvokeMessage | WebsocketResponseMessage | WebsocketEventMessage;