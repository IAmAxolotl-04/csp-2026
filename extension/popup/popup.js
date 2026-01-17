// Password Smoke Detector Popup Logic
// January 17, 2026

// Initialize counts from storage or defaults
let stats = {
    checksToday: 0,
    warningsIssued: 0,
    breachesFound: 0,
    privacyScore: '100%'
};

// Load stats from Chrome storage
chrome.storage.local.get(['cspStats'], (result) => {
    if (result.cspStats) {
        stats = { ...stats, ...result.cspStats };
    }
    updateDisplay();
});

// Update the display
function updateDisplay() {
    document.getElementById('checksToday').textContent = stats.checksToday;
    document.getElementById('warningsIssued').textContent = stats.warningsIssued;
    document.getElementById('breachesFound').textContent = stats.breachesFound;
    document.getElementById('privacyScore').textContent = stats.privacyScore;
}

// Save stats to storage
function saveStats() {
    chrome.storage.local.set({ cspStats: stats });
}

// Test button handler
document.getElementById('testBtn').addEventListener('click', () => {
    const testPasswords = [
        { password: 'password123', expected: 'breached' },
        { password: 'MySecurePass!2026', expected: 'strong' },
        { password: '123456', expected: 'breached' },
        { password: 'CSP-Protocol-2026', expected: 'strong' }
    ];
    
    let results = '';
    
    testPasswords.forEach((test, index) => {
        // Simulate check (in reality, this would use the content script logic)
        const isBreached = ['password123', '123456'].includes(test.password);
        const strength = test.password.length > 10 ? 'strong' : 'weak';
        
        results += `${index + 1}. "${test.password.substring(0, 10)}..." - `;
        
        if (isBreached) {
            results += '🚨 BREACHED\n';
            stats.breachesFound++;
        } else if (strength === 'strong') {
            results += '✅ STRONG\n';
        } else {
            results += '⚠️ WEAK\n';
            stats.warningsIssued++;
        }
        
        stats.checksToday++;
    });
    
    // Update and save
    updateDisplay();
    saveStats();
    
    // Show results
    alert(`Test Results:\n\n${results}\n\nAll checks performed locally.`);
});

// Learn More button
document.getElementById('learnMoreBtn').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ 
        url: 'https://github.com/credential-privacy/whitepaper' 
    });
});

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', () => {
    // Reset today's stats
    stats.checksToday = 0;
    stats.warningsIssued = 0;
    stats.breachesFound = 0;
    
    updateDisplay();
    saveStats();
    
    alert('Statistics reset. Starting fresh count for today.');
});

// GitHub link
document.getElementById('githubLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({
        url: 'https://github.com/credential-privacy/smoke-detector'
    });
});

// Listen for checks from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'passwordCheck') {
        stats.checksToday++;
        
        if (request.result.breached) {
            stats.breachesFound++;
        } else if (request.result.strength < 40) {
            stats.warningsIssued++;
        }
        
        updateDisplay();
        saveStats();
    }
});

// Initialize
console.log('🔐 Password Smoke Detector popup loaded');
