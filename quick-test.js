// Quick CSP Protocol Test
const CSPPrefixHasher = require("./protocol/core/hasher");

async function quickTest() {
    console.log("🔍 CSP Protocol Quick Test");

    const hasher = new CSPPrefixHasher({ debug: true });

    const testData = [
        { password: "test123" },
        { password: "password1" }
    ];

    for (const item of testData) {
        const hashResult = hasher.hashForPrefix(item.password);
        console.log(`Password: "${item.password.substring(0,3)}..."`);
        console.log(`Prefix: ${hashResult.prefix}`);
    }

    console.log("✅ Quick test completed");
}

quickTest().catch(console.error);
