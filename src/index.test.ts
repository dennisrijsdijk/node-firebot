/// <reference types="mocha" />
import assert from "assert";
import { FirebotClient } from ".";
import type { ApiRoute } from "./api-route";

function generateStandardRouteTests(routeName: string) {
    it(`should be accessible from FirebotClient`, () => {
        const firebotClient = new FirebotClient("localhost");
        assert.ok((firebotClient as unknown as Record<string, ApiRoute>)[routeName]);
    });

    it(`should have correct baseUrl`, () => {
        const firebotClient = new FirebotClient("localhost");
        const route = (firebotClient as unknown as Record<string, ApiRoute>)[routeName];
        assert.strictEqual(route["baseUrl"], `http://localhost:7472/api/v1`);
    });

    it(`should have access to FirebotClient instance`, () => {
        const firebotClient = new FirebotClient("localhost");
        const route = (firebotClient as unknown as Record<string, ApiRoute>)[routeName];
        assert.strictEqual(route["firebotClient"], firebotClient);
    });
};

describe("FirebotClient", () => {
    it("should create an instance with default port, insecure and correct baseUrl", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(client["host"], "localhost");
        assert.strictEqual(client["port"], 7472);
        assert.strictEqual(client["baseUrl"], "http://localhost:7472/api/v1");
    });

    it("should create an instance with custom port, insecure and correct baseUrl", () => {
        const client = new FirebotClient("localhost", 8080);
        assert.strictEqual(client["host"], "localhost");
        assert.strictEqual(client["port"], 8080);
        assert.strictEqual(client["baseUrl"], "http://localhost:8080/api/v1");
    });

    it("should create an instance with default port, secure and correct baseUrl", () => {
        const client = new FirebotClient("example.com", undefined, true);
        assert.strictEqual(client["host"], "example.com");
        assert.strictEqual(client["port"], 7472);
        assert.strictEqual(client["baseUrl"], "https://example.com:7472/api/v1");
    });

    it("should create an instance with custom port, secure and correct baseUrl", () => {
        const client = new FirebotClient("example.com", 8080, true);
        assert.strictEqual(client["host"], "example.com");
        assert.strictEqual(client["port"], 8080);
        assert.strictEqual(client["baseUrl"], "https://example.com:8080/api/v1");
    });

    it("should error when creating an instance with invalid host", () => {
        assert.throws(() => {
            new FirebotClient("");
        }, /Invalid host/);
    });

    it("should error when creating an instance with invalid port", () => {
        assert.throws(() => {
            new FirebotClient("localhost", -1);
        }, /Invalid port number/);
    });
});

describe("StatusRoute", () => {
    generateStandardRouteTests("status");

    it("should have getStatus method in StatusRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.status.getStatus, "function");
    });
});

describe("EffectsRoute", () => {
    generateStandardRouteTests("effects");

    it("should have getEffects method in EffectsRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.effects.getEffects, "function");
    });

    it("should have getEffect method in EffectsRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.effects.getEffect, "function");
    });

    it("should have runEffects method in EffectsRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.effects.runEffects, "function");
    });

    it("should have getPresetEffectLists method in EffectsRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.effects.getPresetEffectLists, "function");
    });

    it("should have runPresetEffectList method in EffectsRoute", () => {
        const client = new FirebotClient("localhost");
        assert.strictEqual(typeof client.effects.runPresetEffectList, "function");
    });
});