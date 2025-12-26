import { ApiRoute } from "../api-route";
import { ApiStatusResponse } from "../types/api";

export type FirebotFont = {
    name: string;
    format: "truetype" | "opentype" | "woff" | "woff2";
};

export class FontsRoute extends ApiRoute {
    /**
     * Fetches the list of fonts from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {FirebotFont[]} An array of fonts.
     */
    getFonts(): Promise<FirebotFont[]> {
        return fetch(`${this.baseUrl}/fonts`).then(res => res.json());
    }

    /**
     * Fetches a specific font by its name from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param fontName - The name of the font to retrieve.
     * @returns {Blob} The font file as a Blob.
     */
    async getFont(fontName: string): Promise<Blob> {
        const response = await fetch(`${this.baseUrl}/fonts/${encodeURIComponent(fontName)}`);

        if (!response.ok) {
            const errorResponse = await response.json() as ApiStatusResponse;
            throw new Error(errorResponse.message || `Failed to fetch font: ${fontName}`);
        }

        return response.blob();
    }
}