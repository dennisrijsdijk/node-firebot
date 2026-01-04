import { ApiRoute } from "../api-route";
import type { SimpleTimer, Timer } from "../types/timers";

export class TimersRoute extends ApiRoute {
    /**
     * Fetches the list of timers from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {SimpleTimer[]} An array of simple timers.
     */
    async getTimers(): Promise<SimpleTimer[]> {
        return this.fetch("GET", `${this.baseUrl}/timers`).then(res => res.json()) as Promise<SimpleTimer[]>;
    }

    /**
     * Fetches a specific timer by its ID from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param timerId - The ID of the timer to retrieve.
     * @returns {Timer} The details of the specified timer.
     */
    async getTimer(timerId: string): Promise<Timer> {
        return this.fetch("GET", `${this.baseUrl}/timers/${encodeURIComponent(timerId)}`)
            .then(res => res.json()) as Promise<Timer>;
    }

    /**
     * Updates a specific timer by its ID in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param timerId - The ID of the timer to update.
     * @param updateMode - The update mode: "enable", "disable", "toggle", or "clear".
     */
    async updateTimer(timerId: string, updateMode: "enable" | "disable" | "toggle" | "clear") {
        await this.fetch("GET", `${this.baseUrl}/timers/${encodeURIComponent(timerId)}/${updateMode}`);
    }
}