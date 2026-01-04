import { ApiRoute } from "../api-route";
import type { EffectQueueConfig } from "../types/queues";
import { ApiStatusResponse } from "../types/api";
import { EffectList } from "../types/effects";

export class QueuesRoute extends ApiRoute {
    /**
     * Fetches the list of effect queues from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @returns {EffectQueueConfig[]} An array of effect queue configurations.
     */
    async getEffectQueues(): Promise<EffectQueueConfig[]> {
        return fetch(`${this.baseUrl}/queues/`).then(res => res.json()) as Promise<EffectQueueConfig[]>;
    }

    /**
     * Fetches a specific effect queue from the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param queueId - The ID of the effect queue to retrieve.
     * @returns {EffectQueueConfig} The details of the specified effect queue.
     */
    async getEffectQueue(queueId: string): Promise<EffectQueueConfig> {
        const response = await fetch(`${this.baseUrl}/queues/${encodeURIComponent(queueId)}`).then(res => res.json()) as EffectQueueConfig | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Updates a specific effect queue in the Firebot API.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param queueId - The ID of the effect queue to update.
     * @param updateMode - The update mode: "pause", "resume", "toggle" or "clear".
     * @returns {EffectQueueConfig} The updated effect queue configuration.
     */
    async updateEffectQueue(queueId: string, updateMode: "pause" | "resume" | "toggle" | "clear"): Promise<EffectQueueConfig> {
        const response = await fetch(`${this.baseUrl}/queues/${encodeURIComponent(queueId)}/${updateMode}`).then(res => res.json()) as EffectQueueConfig | ApiStatusResponse;

        if ("status" in response) {
            throw new Error(response.message);
        }

        return response;
    }

    /**
     * Triggers the next effect in the specified queue in the Firebot API. This should only be used with manual queues.
     *
     * @throws {Error} If the API response indicates an error or a connection issue occurs.
     * @param queueId - The ID of the queue to trigger.
     */
    async triggerEffectQueue(queueId: string): Promise<void> {
        const effects: EffectList = {
            id: crypto.randomUUID(),
            list: [
                {
                    id: crypto.randomUUID(),
                    type: "firebot:trigger-manual-effect-queue",
                    active: true,
                    effectQueueId: queueId
                }
            ]
        };
        return this.firebotClient.effects.runEffects(effects, {});
    }
}