import { ApiRoute } from "../api-route";
import { FirebotFont } from "../types/fonts";
import { ApiStatusResponse } from "../types/api";

export class FontsRoute extends ApiRoute {
    getFonts(): Promise<FirebotFont[]> {
        return fetch(`${this.baseUrl}/fonts`).then(res => res.json());
    }

    async getFont(fontName: string): Promise<Blob> {
        const response = await fetch(`${this.baseUrl}/fonts/${encodeURIComponent(fontName)}`);

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message || `Failed to fetch font: ${fontName}`);
        }

        return response.blob();
    }
}