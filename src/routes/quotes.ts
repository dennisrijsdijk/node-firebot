import { ApiRoute } from "../api-route";
import { NewQuote, Quote } from "../types/quotes";
import { ApiStatusResponse } from "../types/api";

export class QuotesRoute extends ApiRoute {
    /**
     * Fetches the list of quotes from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {Quote[]} An array of quotes.
     */
    async getQuotes(): Promise<Quote[]> {
        return fetch(`${this.baseUrl}/quotes`).then(res => res.json()) as Promise<Quote[]>;
    }

    /**
     * Fetches a specific quote by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param quoteId - The ID of the quote to retrieve.
     * @returns {Quote} The details of the specified quote.
     */
    async getQuote(quoteId: number): Promise<Quote> {
        const response = await fetch(`${this.baseUrl}/quotes/${quoteId}`).then(res => res.json()) as Quote | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Creates a new quote in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param quote - The quote data to create.
     * @returns {Quote} The created quote.
     */
    async createQuote(quote: NewQuote): Promise<Quote> {
        const response = await fetch(`${this.baseUrl}/quotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quote)
        });

        if (!response.ok) {
            throw new Error((await response.json() as ApiStatusResponse).message);
        }

        return response.json() as Promise<Quote>;
    }

    /**
     * Creates or edits a quote in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param quote - The quote data to create or edit.
     * @returns {Quote} The created or edited quote.
     */
    async addOrEditQuote(quote: Quote): Promise<Quote> {
        const firebotFormattedQuote: { id?: number, _id: number } = {
            ...quote,
            _id: quote.id
        };
        delete firebotFormattedQuote.id;

        const response = await fetch(`${this.baseUrl}/quotes/${firebotFormattedQuote._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(firebotFormattedQuote)
        });

        if (!response.ok) {
            throw new Error((await response.json() as ApiStatusResponse).message);
        }

        return response.json() as Promise<Quote>;
    }

    /**
     * Updates an existing quote in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param quoteId - The ID of the quote to update.
     * @param quoteUpdates - The partial quote data to update. Only the provided fields will be updated.
     * @returns {Quote} The updated quote.
     */
    async updateQuote(quoteId: number, quoteUpdates: Partial<Quote>): Promise<Quote> {
        const response = await fetch(`${this.baseUrl}/quotes/${quoteId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quoteUpdates)
        });

        if (!response.ok) {
            throw new Error((await response.json() as ApiStatusResponse).message);
        }

        return response.json() as Promise<Quote>;
    }

    /**
     * Deletes a quote from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param quoteId - The ID of the quote to delete.
     */
    async deleteQuote(quoteId: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/quotes/${quoteId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error((await response.json() as ApiStatusResponse).message);
        }
    }
}