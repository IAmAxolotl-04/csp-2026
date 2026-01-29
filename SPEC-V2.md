# Credential Shield Protocol - V2 Draft
## Privacy-Preserving Breach Risk Scoring

### Core Philosophy
Replace **"Is Password P in Breach List B?"** with **"What is the risk signal for Password P relative to Breach List B?"** without exposing P or the result to the server.

### High-Level Workflow
1.  **Setup:** Audit server pre-processes breach corpus into a set of encrypted risk indicators using an OPRF key.
2.  **Audit Query:** Client uses an OPRF protocol to derive a blinded token from a password hash.
3.  **Server Processing:** Server evaluates the token against its encrypted risk set, returning an encrypted risk score vector.
4.  **Client Result:** Client unblinds the result to get a risk score (e.g., "High/Medium/Low" or similarity metric), not a binary match.

### Key Advantages Over V1
*   **No Shadow Hash:** Avoids the Argon2->SHA-1 bridge entirely.
*   **True Privacy:** Server never sees client tokens in plaintext; client learns only a risk score.
*   **Practical:** Designed for batch, offline processing of credential databases.

### Components to Build/Research
1.  OPRF library integration (e.g., using `liboprf`).
2.  Risk scoring algorithm (e.g., based on hash prefix frequency, not equality).
3.  Reference implementation for a batch audit job.
