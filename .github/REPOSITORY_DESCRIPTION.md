# Password Smoke Detector (Credential Shield Protocol)

A privacy-first protocol for checking passwords against known breaches without exposing full credentials.

## Why This Exists
Traditional password breach checking services require sending full password hashes to third-party servers. 
This protocol uses a zero-knowledge approach where only non-reversible hash prefixes are exchanged.

## Key Features
- 🔒 Zero-knowledge verification (server learns minimal information)
- ⚡ Real-time password strength analysis
- 🌐 Browser extension for seamless integration  
- 📊 Local breach database (no external calls required)
- 🎯 Prefix-only hash transmission (privacy by design)

## Live Demo
- Web Interface: https://iamaxolotl-04.github.io/password-smoke-detector/
- Browser Extension: ./extension/

## Technology Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Extension: Chrome Extension API, Manifest V3
- Protocol: SHA-512 hashing, prefix-exchange design
- Deployment: GitHub Pages, Vercel

## For Developers
This project is built using the "Cake Boss" MVP methodology - starting with a minimal "vending machine" 
version to test core concepts before scaling.
