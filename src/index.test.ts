/// <reference types="mocha" />
import assert from "assert";
import { FirebotClient } from "./index.ts";
import type { ApiRoute } from "./api-route.ts";

function generateStandardRouteTests(routeName: keyof FirebotClient) {
    it(`should be accessible from FirebotClient`, () => {
        const firebotClient = new FirebotClient("localhost");
        assert.ok(firebotClient[routeName]);
    });

    it(`should have correct baseUrl`, () => {
        const firebotClient = new FirebotClient("localhost");
        const route = firebotClient[routeName] as ApiRoute;
        assert.strictEqual(route["baseUrl"], `http://localhost:7472/api/v1`);
    });

    it(`should have access to FirebotClient instance`, () => {
        const firebotClient = new FirebotClient("localhost");
        const route = firebotClient[routeName] as ApiRoute;
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
});

describe("EffectsRoute", () => {
    generateStandardRouteTests("effects");
});

describe("CommandsRoute", () => {
    generateStandardRouteTests("commands");
});

describe("FontsRoute", () => {
    generateStandardRouteTests("fonts");
});

describe("CustomVariablesRoute", () => {
    generateStandardRouteTests("customVariables");
});

describe("ReplaceVariablesRoute", () => {
    generateStandardRouteTests("replaceVariables");
});

describe("ViewersRoute", () => {
    generateStandardRouteTests("viewers");
});

describe("CustomRolesRoute", () => {
    generateStandardRouteTests("customRoles");
});

describe("CurrencyRoute", () => {
    generateStandardRouteTests("currency");
});

describe("QuotesRoute", () => {
    generateStandardRouteTests("quotes");
});

describe("CountersRoute", () => {
    generateStandardRouteTests("counters");
});

describe("TimersRoute", () => {
    generateStandardRouteTests("timers");
});

describe("QueuesRoute", () => {
    generateStandardRouteTests("queues");
});