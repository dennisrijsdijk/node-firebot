type FirebotCustomVariable = {
    t: number;
    v?: string | number | boolean | Record<string, unknown> | Array<unknown>;
    meta: {
        persist?: boolean;
    };
};

export type CustomVariable = {
    name: string;
    data?: string | number | boolean | Record<string, unknown> | Array<unknown>;
    ttl: number;
    persist: boolean;
};

export type WebsocketCustomVariable = {
    name: string;
    value: string;
};