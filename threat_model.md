# CSP Threat Model & Limitations

## Explicit Non-Protections
CSP is explicitly designed **NOT** to protect against:
1. **Targeted phishing attacks**
2. **Client-side compromise** (keyloggers, malware)
3. **Session hijacking**
4. **MFA bypass or fatigue attacks**
5. **Zero-day credential leaks not yet in breach corpora**
6. **Weak but unbreached passwords**

## Operational Realities & Assumptions
### Prefix Leakage Considerations
While 32-bit prefixes are not reversible to passwords, they can become **behavioral fingerprints** at scale if:
* Queries are frequent and unmasked
* Timing or network metadata is correlated
* Malicious servers track activity over time

**Mitigations:** Request padding, query batching, client-side rate limiting.

### Breach Corpus Limitations
CSP's effectiveness depends entirely on:
* **Freshness** of breach data
* **Coverage** across relevant breaches
* **Normalization** quality of source data
* **False-positive/negative rates**

This corpus maintenance represents the long-term operational cost center.

### Client Trust Boundaries
CSP assumes:
* Clients correctly implement the hashing protocol
* Clients are not actively compromised during checks
* Clients enforce remediation when breaches are detected

**These assumptions break in:** Highly adversarial environments, BYOD scenarios without EDR, or where client software cannot be trusted.

## Integration Security Patterns
### Recommended (Defense-in-Depth)
* CSP hit → Force rotation **+** MFA re-validation
* CSP hit → Trigger step-up authentication
* CSP hit → Prioritize for passkey migration
* CSP hit → Increase monitoring on affected account

### NOT Recommended
* Using CSP result as authentication gate
* Replacing MFA with CSP checks
* Assuming "clean" CSP status means "safe account"
