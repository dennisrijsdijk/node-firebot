import { ApiRoute } from "../api-route";
import { Currency, TopCurrencyViewer } from "../types/currency";

export class CurrencyRoute extends ApiRoute {
    /**
     * Fetches the list of currencies from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {Currency[]} An array of currencies.
     */
    async getCurrencies(): Promise<Currency[]> {
        return this.fetch("GET", `${this.baseUrl}/currency`).then(res => res.json()) as Promise<Currency[]>;
    }

    /**
     * Fetches a specific currency by its name from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param currencyName - The name of the currency to retrieve.
     * @returns {Currency} The details of the specified currency.
     */
    async getCurrency(currencyName: string): Promise<Currency> {
        const response = await this.fetch("GET", `${this.baseUrl}/currency/${encodeURIComponent(currencyName)}`);

        if ((await (response.clone().text())).length === 0) {
            throw new Error(`Currency not found: ${currencyName}`);
        }

        return response.json() as Promise<Currency>;
    }

    /**
     * Fetches the top viewers by currency from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param currencyName - The name of the currency to retrieve top viewers for.
     * @param limit - The maximum number of top viewers to retrieve. Defaults to 10.
     * @returns {Currency[]} An array of top viewers for the specified currency.
     */
    async getTopViewersByCurrency(currencyName: string, limit: number = 10): Promise<TopCurrencyViewer[]> {
        return this.fetch("GET", `${this.baseUrl}/currency/${encodeURIComponent(currencyName)}/top?limit=${limit}`)
            .then(res => res.json()) as Promise<TopCurrencyViewer[]>;
    }
}