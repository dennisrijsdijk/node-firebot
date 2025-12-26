import type { TriggersObject } from "./effects";

export type VariableCategory =
    | "common"
    | "trigger based"
    | "user based"
    | "text"
    | "numbers"
    | "advanced"
    | "obs"
    | "integrations";

export type VariableUsage = {
    usage: string;
    description?: string;
};

interface VariableDefinition {
    handle: string;
    aliases?: string[];
    usage?: string;
    description: string;
    examples?: VariableUsage[];
    hasSuggestions?: boolean;
    noSuggestionsText?: string;
    categories?: VariableCategory[];
    triggers?: TriggersObject;
    possibleDataOutput: Array<"null" | "bool" | "number" | "text" | "array" | "object" | "ALL">;
    sensitive?: boolean;
    hidden?: boolean;
    spoof?: true;
}

export type ReplaceVariable = {
    definition: VariableDefinition;
    handle: string;
    triggers?: TriggersObject;
};