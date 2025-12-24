import { RestrictionData } from "./restrictions";
import { EffectList } from "./effects";

export type CustomCommand = {
    id: string;
    trigger: string;
    description?: string;
};

export type SystemCommand = {
    id: string;
    trigger: string;
    name: string;
};

export type CommandType = "system" | "custom";

export type Cooldown = {
    /**
     * Global cooldown to use a command in seconds.
     */
    global: number | undefined;
    /**
     * Cooldown for each user to use a command in seconds.
     */
    user: number | undefined;
};

export type SubCommand = {
    arg: string;
    usage: string;
    active?: boolean;
    autoDeleteTrigger?: boolean | undefined;
    id?: string;
    description?: string;
    minArgs?: number;
    regex?: boolean;
    fallback?: boolean;
    restrictionData?: RestrictionData;
    cooldown?: Cooldown | undefined;
    hideCooldowns?: boolean;
    inheritBaseCommandCooldown?: boolean;
    effects?: EffectList;
    hidden?: boolean;
};

export type CommandDefinition = {
    id?: string;
    name?: string;
    description?: string;
    type?: CommandType;
    createdBy?: string;
    createdAt?: Date | string;
    lastEditBy?: string | undefined;
    lastEditAt?: Date | string | undefined;
    /**
     * Describes how many times the command has been used in chat.
     */
    count?: number;
    active: boolean;
    trigger: string;
    triggerIsRegex?: boolean | undefined;
    scanWholeMessage?: boolean | undefined;
    aliases?: string[];
    usage?: string;
    /**
     * If the chat message that triggered the command should be deleted automatically.
     */
    autoDeleteTrigger?: boolean | undefined;
    /**
     * If the UI should show the edit page in simple or advanced mode.
     */
    simple?: boolean;
    /**
     * If the command should be hidden from the `!commands` list.
     */
    hidden?: boolean | undefined;
    ignoreStreamer?: boolean | undefined;
    ignoreBot?: boolean | undefined;
    ignoreWhispers?: boolean | undefined;
    /**
     * If a chat message should be sent when the command is tried to be used but
     * the cooldown is not yet over.
     */
    sendCooldownMessage?: boolean;
    sendCooldownMessageAsReply?: boolean;
    useCustomCooldownMessage?: boolean;
    cooldownMessage?: string;
    baseCommandDescription?: string | undefined;
    sortTags?: string[];
    cooldown?: Cooldown | undefined;
    effects?: EffectList;
    restrictionData?: RestrictionData;
    subCommands?: SubCommand[] | undefined;
    fallbackSubcommand?: SubCommand | undefined;
    treatQuotedTextAsSingleArg?: boolean | undefined;
    minArgs?: number;
    options?: Record<string, unknown>;
    /**
     * Only set for currency system commands.
     */
    currency?: {
        name: string;
        id: string;
    };
    allowTriggerBySharedChat?: boolean | "inherit" | undefined;
    hideCooldowns?: boolean;
};