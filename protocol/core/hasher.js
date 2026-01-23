// ============================================
// CSP CORE: PREFIX HASHER MODULE
// Credential Shield Protocol (CSP) - Reference Implementation
//
// SECURITY NOTICE:
// This module is NOT a password storage hasher.
// It is intended ONLY for deriving fixed-length
// hash prefixes for k-anonymity / breach checking.
//
// DO NOT use this module for authentication,
// password storage, or key derivation.
//
// This implementation is suitable as a
// NON-NORMATIVE reference implementation for RFC use.
// ============================================

'use strict';

const crypto = require('crypto');

/**
 * CSPPrefixHasher
 *
 * Threat Model:
 * - Adversary may observe hash prefixes
 * - Adversary may operate an honest-but-curious server
 * - Full password must never be recoverable
 *
 * Non-Goals:
 * - Password storage security
 * - Brute-force resistance
 * - Authentication or key derivation
 */
class CSPPrefixHasher {

    /**
     * IANA-style algorithm registry (conceptual)
     * For cross-implementation interoperability
     *
     * NOTE: Identifiers are informational and NON-NORMATIVE
     */
    static get ALGORITHMS() {
        return {
            SHA256: { id: 1, name: 'sha256', outputHexLength: 64, bits: 256 },
            SHA384: { id: 2, name: 'sha384', outputHexLength: 96, bits: 384 },
            SHA512: { id: 3, name: 'sha512', outputHexLength: 128, bits: 512 }
        };
    }

    /**
     * CSP Protocol Error Codes
     */
    static get ERROR_CODES() {
        return {
            INVALID_ALGORITHM: 'CSP_ERR_001',
            PREFIX_LENGTH_OUT_OF_BOUNDS: 'CSP_ERR_002',
            INPUT_VALIDATION_FAILED: 'CSP_ERR_003',
            PASSWORD_TOO_SHORT_FOR_CHECK: 'CSP_ERR_004', // Reserved for future use
            INTERNAL_HASH_FAILURE: 'CSP_ERR_005'
        };
    }

    /**
     * Protocol Version
     */
    static get PROTOCOL_VERSION() {
        return 'csp-1.0-draft';
    }

    constructor(options = {}) {
        this.algorithm = options.algorithm || 'sha512';
        this.prefixLength = options.prefixLength || 16;
        this.debug = options.debug === true;

        this.#initializeAlgorithmConstants();
        this.#validateParameters();
    }

    #initializeAlgorithmConstants() {
        const registry = CSPPrefixHasher.ALGORITHMS;
        const entry = Object.values(registry).find(a => a.name === this.algorithm);

        this.maxHashLength = entry ? entry.outputHexLength : null;
        this.bitsPerHexChar = 4;
    }

    #validateParameters() {
        const supportedAlgorithms = Object.values(CSPPrefixHasher.ALGORITHMS)
            .map(a => a.name);

        if (!supportedAlgorithms.includes(this.algorithm)) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.INVALID_ALGORITHM}: Unsupported hash algorithm '${this.algorithm}'`
            );
        }

        if (!Number.isInteger(this.prefixLength)) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.PREFIX_LENGTH_OUT_OF_BOUNDS}: prefixLength must be an integer`
            );
        }

        if (this.prefixLength < 8) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.PREFIX_LENGTH_OUT_OF_BOUNDS}: prefixLength < 8 is insecure (minimum 32 bits)`
            );
        }

        if (this.prefixLength > this.maxHashLength) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.PREFIX_LENGTH_OUT_OF_BOUNDS}: prefixLength exceeds ${this.algorithm.toUpperCase()} output bounds`
            );
        }
    }

    hashForPrefix(password) {
        if (typeof password !== 'string' || password.length === 0) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.INPUT_VALIDATION_FAILED}: Password must be a non-empty string`
            );
        }

        let processingTimeNs;
        let hash;
        const startTime = this.debug ? process.hrtime.bigint() : null;

        try {
            hash = crypto
                .createHash(this.algorithm)
                .update(password, 'utf8')
                .digest('hex');
        } catch {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.INTERNAL_HASH_FAILURE}: Hash computation failed`
            );
        }

        if (this.debug && startTime !== null) {
            processingTimeNs = Number(process.hrtime.bigint() - startTime);
        }

        const prefix = hash.slice(0, this.prefixLength);

        if (this.debug) {
            console.log(`[CSP/${this.algorithm}] Prefix hash generated`);
            console.log(`[CSP/${this.algorithm}] Prefix: ${prefix}…`);
        }

        const result = {
            fullHash: hash,
            prefix,
            algorithm: this.algorithm,
            prefixLength: this.prefixLength,
            hashLength: hash.length,
            protocolVersion: CSPPrefixHasher.PROTOCOL_VERSION
        };

        if (this.debug) {
            result.processingTimeNs = processingTimeNs;
        }

        return result;
    }

    evaluatePasswordForBreachCheck(password) {
        if (typeof password !== 'string') {
            return {
                shouldCheck: false,
                reason: 'invalid_input',
                score: 0,
                recommendation: 'Input must be a string',
                errorCode: CSPPrefixHasher.ERROR_CODES.INPUT_VALIDATION_FAILED
            };
        }

        const normalized = password.toLowerCase();
        const obviousPasswords = new Set([
            'password','123456','12345678','123456789','1234567890',
            'qwerty','abc123','password1','admin','welcome'
        ]);

        if (obviousPasswords.has(normalized)) {
            return {
                shouldCheck: true,
                reason: 'extremely_common',
                score: 0,
                recommendation: 'Password is known to be compromised',
                errorCode: null
            };
        }

        let score = 0;
        if (password.length >= 12) score += 30;
        if (password.length >= 16) score += 10;
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;

        return {
            shouldCheck: true,
            reason: score < 50 ? 'weak_password' : 'reasonable_password',
            score,
            recommendation:
                score >= 70
                    ? 'Password appears strong'
                    : 'Consider increasing length or complexity',
            errorCode: null
        };
    }

    generateTestVectors() {
        const inputs = [
            { password: 'test123', description: 'Simple test case' },
            { password: 'StrongP@ssw0rd!2024', description: 'Complex password' },
            { password: 'correct horse battery staple', description: 'Passphrase' },
            { password: 'a', description: 'Minimal length input' }
        ];

        return inputs.map(({ password, description }) => {
            const hash = crypto
                .createHash(this.algorithm)
                .update(password, 'utf8')
                .digest('hex');

            return {
                description,
                input: password,
                inputLength: password.length,
                fullHash: hash,
                prefix: hash.slice(0, this.prefixLength),
                algorithm: this.algorithm,
                prefixLength: this.prefixLength,
                protocolVersion: CSPPrefixHasher.PROTOCOL_VERSION
            };
        });
    }

    getCollisionStats() {
        const bitsOfSecurity = this.prefixLength * this.bitsPerHexChar;
        const spaceSize = Math.pow(2, bitsOfSecurity);

        return {
            prefixLength: this.prefixLength,
            bitsOfSecurity,
            singleComparisonProbability: `1 / 2^${bitsOfSecurity}`,
            spaceSizeHuman: spaceSize.toLocaleString(),
            assessment:
                bitsOfSecurity >= 64
                    ? 'Adequate for CSP breach-prefix queries'
                    : 'Increase prefix length for safety',
            reference: 'CSP Internet-Draft, Appendix A.1 (Collision Analysis)'
        };
    }

    clearPasswordReference(_password) {
        if (this.debug) {
            console.log('[CSP] clearPasswordReference invoked (conceptual)');
        }
        return true;
    }

    batchHashForPrefix(passwords) {
        if (!Array.isArray(passwords)) {
            throw new Error(
                `${CSPPrefixHasher.ERROR_CODES.INPUT_VALIDATION_FAILED}: passwords must be an array`
            );
        }

        const results = [];
        const startTime = this.debug ? process.hrtime.bigint() : null;

        for (const password of passwords) {
            if (typeof password !== 'string') {
                results.push({
                    error: 'invalid_input_type',
                    errorCode: CSPPrefixHasher.ERROR_CODES.INPUT_VALIDATION_FAILED,
                    input: this.debug ? String(password) : '[redacted]'
                });
                continue;
            }

            try {
                results.push(this.hashForPrefix(password));
            } catch (error) {
                results.push({
                    error: error.message,
                    errorCode: CSPPrefixHasher.ERROR_CODES.INTERNAL_HASH_FAILURE,
                    input: this.debug ? password.substring(0, 3) + '...' : '[redacted]'
                });
            }
        }

        let totalTimeNs = 0;
        if (this.debug && startTime !== null) {
            totalTimeNs = Number(process.hrtime.bigint() - startTime);
        }

        return {
            results,
            batchStats: {
                totalPasswords: passwords.length,
                successful: results.filter(r => !r.error).length,
                failed: results.filter(r => r.error).length,
                averageTimePerPasswordNs:
                    passwords.length > 0 ? totalTimeNs / passwords.length : 0,
                totalProcessingTimeNs: totalTimeNs
            },
            protocolVersion: CSPPrefixHasher.PROTOCOL_VERSION
        };
    }

    getProtocolMetadata() {
        return {
            protocolName: 'Credential Shield Protocol (CSP)',
            version: CSPPrefixHasher.PROTOCOL_VERSION,
            referenceImplementation: 'CSPPrefixHasher',
            algorithms: Object.values(CSPPrefixHasher.ALGORITHMS).map(a => a.name),
            errorCodes: CSPPrefixHasher.ERROR_CODES,
            securityNotice: 'For breach checking only. NOT for password storage.',
            rfcStatus: 'DRAFT'
        };
    }

    toString() {
        return `[CSPPrefixHasher: ${this.algorithm}, prefix=${this.prefixLength} chars, version=${CSPPrefixHasher.PROTOCOL_VERSION}]`;
    }
}

module.exports = CSPPrefixHasher;
