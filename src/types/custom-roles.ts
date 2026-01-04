import { BasicViewer } from "./viewers";

export type CustomRole = {
    id: string;
    name: string;
    viewers: BasicViewer[];
};

export type WebsocketCustomRole = CustomRole & { showBadgeInChat?: boolean };