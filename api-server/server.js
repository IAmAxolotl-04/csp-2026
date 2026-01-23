// ============================================
// CSP API SERVER - Reference Implementation
// Author: IAmAxolotl-04
// Repo: https://github.com/IAmAxolotl-04/password-smoke-detector
// Implements RFC draft-ietf-csp-credential-shield-00
// ============================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const winston = require("winston");

// =================== CSP PREFIX MATCHER ===================

class CSPPrefixMatcher {
    constructor(options) {
        this.enableCache = options?.enableCache ?? true;
        this.debug = options?.debug ?? false;
        this._breachHashes = [];
    }

    loadBreachData({ hashes }) {
        this._breachHashes = hashes || [];
    }

    static generateMockBreachData(count = 1000) {
        const hashes = [];
        for (let i = 0; i < count; i++) {
            const prefix = [...Array(16)]
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join("");
            hashes.push({ fullHash: prefix + "abcdef1234567890", prefix });
        }
        return hashes;
    }

    findMatches(prefix) {
        const matches = this._breachHashes.filter(h => h.prefix.startsWith(prefix));
        return { matchCount: matches.length, possibleMatches: matches };
    }

    getServerStats() {
        return {
            databaseMetrics: {
                loadedPrefixBuckets: this._breachHashes.length,
                estimatedTotalHashes: this._breachHashes.length
            },
            operationalMetrics: { uptime: process.uptime() }
        };
    }
}

// =================== LOGGER ===================

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "csp-api.log" })
    ]
});

// =================== INITIALIZE ===================

const cspMatcher = new CSPPrefixMatcher({ enableCache: true, debug: process.env.NODE_ENV !== "production" });

// Load mock breach data
const sampleBreachData = CSPPrefixMatcher.generateMockBreachData(5000);
cspMatcher.loadBreachData({ hashes: sampleBreachData });

logger.info("CSP API Server initialized", {
    breachRecords: sampleBreachData.length,
    protocolVersion: "csp-1.0-draft"
});

// =================== RATE LIMITER ===================

const rateLimiter = new RateLimiterMemory({ points: 100, duration: 60 });

// =================== EXPRESS APP ===================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "10kb" }));

app.use(async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch (rejRes) {
        res.status(429).json({
            error: "Too many requests",
            retryAfter: Math.ceil(rejRes.msBeforeNext / 1000),
            protocolVersion: "csp-1.0-draft"
        });
    }
});

// =================== ENDPOINTS ===================

app.get("/api/v1/health", (req, res) => {
    const stats = cspMatcher.getServerStats();
    res.json({
        status: "operational",
        timestamp: new Date().toISOString(),
        protocol: { name: "Credential Shield Protocol", version: "csp-1.0-draft", rfc: "draft-ietf-csp-credential-shield-00" },
        server: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            breachDatabase: {
                prefixes: stats.databaseMetrics.loadedPrefixBuckets,
                totalHashes: stats.databaseMetrics.estimatedTotalHashes
            }
        }
    });
});

app.post("/api/v1/check-prefix", (req, res) => {
    const startTime = process.hrtime.bigint();
    try {
        const { prefix } = req.body;

        if (!prefix || typeof prefix !== "string" || !/^[0-9a-f]{8,128}$/i.test(prefix)) {
            return res.status(400).json({ error: "Invalid prefix", protocolVersion: "csp-1.0-draft" });
        }

        const serverResponse = cspMatcher.findMatches(prefix);
        const processingTimeNs = Number(process.hrtime.bigint() - startTime);

        res.json({ ...serverResponse, serverProcessingTimeNs: processingTimeNs });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: "Internal server error", protocolVersion: "csp-1.0-draft" });
    }
});

app.get("/api/v1/protocol", (req, res) => {
    res.json({
        protocol: {
            name: "Credential Shield Protocol",
            version: "csp-1.0-draft",
            rfc: "draft-ietf-csp-credential-shield-00",
            repository: "https://github.com/IAmAxolotl-04/password-smoke-detector"
        }
    });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Endpoint not found", protocolVersion: "csp-1.0-draft" }));

app.listen(PORT, () => {
    console.log(`🚀 CSP API Server running on port ${PORT}`);
});

module.exports = app;
