import { ApiRoute } from "../api-route";
import type { SimpleCounter, Counter, UpdateCounterResponse } from "../types/counters";

export class CountersRoute extends ApiRoute {
    /**
     * Fetches the list of counters from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {SimpleCounter[]} An array of simple counters.
     */
    async getCounters(): Promise<SimpleCounter[]> {
        return this.fetch("GET", `${this.baseUrl}/counters`)
            .then(res => res.json()) as Promise<SimpleCounter[]>;
    }

    /**
     * Fetches a specific counter by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param counterId - The ID of the counter to retrieve.
     * @returns {Counter} The details of the specified counter.
     */
    async getCounter(counterId: string): Promise<Counter> {
        return this.fetch("GET", `${this.baseUrl}/counters/${encodeURIComponent(counterId)}`)
            .then(res => res.json()) as Promise<Counter>;
    }

    /**
     * Updates a specific counter by its ID in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param counterId - The ID of the counter to update.
     * @param value - The new value for the counter.
     * @param override - Whether to override the current value (default is false, which increments the value).
     * @returns {UpdateCounterResponse} The response from the API after updating the counter.
     */
    async updateCounter(counterId: string, value: number, override: boolean = false): Promise<UpdateCounterResponse> {
        return this.fetch("POST", `${this.baseUrl}/counters/${encodeURIComponent(counterId)}`, {
            value,
            override
        }).then(res => res.json()) as Promise<UpdateCounterResponse>;
    }
}