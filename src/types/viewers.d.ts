export type BasicViewer = {
    id: string;
    username: string;
    displayName: string;
};

export type FirebotViewer = {
    _id: string;
    username: string;
    displayName: string;
    profilePicUrl: string;
    twitch: boolean;
    twitchRoles: string[];
    online: boolean;
    onlineAt: number;
    lastSeen: number;
    joinDate: number;
    minutesInChannel: number;
    chatMessages: number;
    disableAutoStatAccrual: boolean;
    disableActiveUserList: boolean;
    disableViewerList: boolean;
    metadata: Record<string, unknown>;
    ranks: Record<string, string>;
};

export type ExportViewer = FirebotViewer & {
    currency: Record<string, {
        id: string;
        name: string;
        amount: number;
    }>;
};

export type ViewerCustomRole = {
    id: string;
    name: string;
    showBadgeInChat: boolean;
};

export type SpecificViewer = FirebotViewer & {
    currency: Record<string, number>;
    customRoles: ViewerCustomRole[];
};

export type ViewerMetadataUpdate = {
    username: string;
    metadataKey: string;
    metadataValue?: unknown;
};