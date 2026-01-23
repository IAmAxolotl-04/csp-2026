// CSP API Server Tests
const request = require("supertest");
const app = require("./server");

describe("CSP API Server", () => {

    describe("GET /api/v1/health", () => {
        it("should return server health status", async () => {
            const res = await request(app).get("/api/v1/health");
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe("operational");
            expect(res.body.protocol.name).toBe("Credential Shield Protocol");
        });
    });

    describe("POST /api/v1/check-prefix", () => {
        it("should process valid prefix requests", async () => {
            const testPrefix = "a1b2c3d4";
            const res = await request(app)
                .post("/api/v1/check-prefix")
                .send({ prefix: testPrefix });
            
            expect(res.statusCode).toBe(200);
            expect(res.body.matchCount).toBeGreaterThanOrEqual(0);
        });

        it("should reject invalid prefix format", async () => {
            const res = await request(app)
                .post("/api/v1/check-prefix")
                .send({ prefix: "invalid!" });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Invalid prefix");
        });

        it("should require prefix in request body", async () => {
            const res = await request(app)
                .post("/api/v1/check-prefix")
                .send({});
            
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Invalid prefix");
        });
    });

    describe("GET /api/v1/protocol", () => {
        it("should return protocol information", async () => {
            const res = await request(app).get("/api/v1/protocol");
            expect(res.statusCode).toBe(200);
            expect(res.body.protocol.name).toBe("Credential Shield Protocol");
            expect(res.body.protocol.rfc).toBe("draft-ietf-csp-credential-shield-00");
        });
    });

    describe("Rate limiting", () => {
        it("should limit excessive requests", async () => {
            const requests = Array(110).fill().map(() =>
                request(app).get("/api/v1/health")
            );
            const responses = await Promise.all(requests);
            const rateLimited = responses.filter(r => r.statusCode === 429);
            expect(rateLimited.length).toBeGreaterThan(0);
        });
    });

});
