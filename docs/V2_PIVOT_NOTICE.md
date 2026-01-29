# Pivot Notice: From Matching to Risk Scoring

## What Happened?
Our initial v1 protocol proposal (server-blind hash matching) received essential critical feedback from the cryptographic community. The core insight: **securely bridging Argon2 -> SHA-1 for equivalence testing creates a "shadow hash" problem** and is information-theoretically problematic.

## The Path Forward: V2 Principles
1.  **Narrowed Threat Model:** Assume an honest-but-curious audit server.
2.  **Shift in Goal:** From deterministic **"Is this password breached?"** to probabilistic **"What is this password's breach risk profile?"**
3.  **New Cryptographic Base:** Exploring **Oblivious Pseudorandom Functions (OPRF)** and Private Set Intersection (PSI) to enable privacy-preserving risk scoring without equivalence testing.
4.  **Operational Reality:** Designed for batch/offline audit cycles, not per-login checks.

## Current Status
- **v1 Spec:** Archived as a learning milestone.
- **v2 Spec:** In active research and draft. Contributions & critique welcome.
- **Core Problem:** The "ongoing credential audit gap" remains 100% valid. We're just building better plumbing.
