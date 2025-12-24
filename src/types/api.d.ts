export type ApiStatusResponse = {
    status: "success" | "error";
    message?: string;
};

export type MetadataWithUsername = {
    username: string;
    [x: string]: unknown;
};