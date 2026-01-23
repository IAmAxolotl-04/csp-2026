// Minimal CSPPrefixMatcher placeholder
class CSPPrefixMatcher {
    constructor(options = {}) {
        this.debug = options.debug === true;
        this.breachData = [];
    }

    loadBreachData(data) {
        this.breachData = data.hashes || [];
        if (this.debug) {
            console.log(`[CSPPrefixMatcher] Loaded ${this.breachData.length} hashes`);
        }
    }

    findMatches(prefix) {
        const matches = this.breachData.filter(h => h.hash.startsWith(prefix));
        return {
            matchCount: matches.length,
            serverKnowledge: { knowsActualMatch: false }
        };
    }

    getServerStats() {
        return {
            loadedHashes: this.breachData.length,
            debug: this.debug
        };
    }
}

module.exports = CSPPrefixMatcher;
