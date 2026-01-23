// CSP API Server Tests
const request = require("supertest");
const app = require("./server");

describe("CSP API Server", () => {
    it("GET /api/v1/health should return operational", async () => {
        const res = await request(app).get("/api/v1/health");
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("operational");
    });
    it("POST /api/v1/check-prefix with valid prefix", async () => {
        const res = await request(app)
            .post("/api/v1/check-prefix")
            .send({ prefix: "a1b2c3d4e5f67890" });
        expect(res.statusCode).toBe(200);
        expect(res.body.matchCount).toBeDefined();
    });
});
