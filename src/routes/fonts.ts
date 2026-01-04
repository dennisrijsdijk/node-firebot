import { ApiRoute } from "../api-route";

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
    async getFonts(): Promise<FirebotFont[]> {
        return this.fetch("GET", `${this.baseUrl}/fonts`).then(res => res.json()) as Promise<FirebotFont[]>;
    }

    /**
     * Fetches a specific font by its name from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param fontName - The name of the font to retrieve.
     * @returns {Blob} The font file as a Blob.
     */
    async getFont(fontName: string): Promise<Blob> {
        return this.fetch("GET", `${this.baseUrl}/fonts/${encodeURIComponent(fontName)}`).then(res => res.blob());
    }
}