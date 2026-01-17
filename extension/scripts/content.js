/**
 * Password Smoke Detector - Core Logic
 * January 17, 2026 - Day 1
 * 
 * This script adds a password safety indicator to password fields
 * based on strength and breach history.
 */

// Local breach database (never leaves device)
const LOCAL_BREACH_DB = [
    '123456', 'password', '123456789', '12345678', '12345',
    '1234567', 'password1', '123123', '111111', 'qwerty',
    'abc123', 'admin', 'letmein', 'welcome', 'monkey',
    'dragon', 'football', 'baseball', 'password123', 'hello'
];

// Password strength checker
function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 12) score += 40;
    else if (password.length >= 8) score += 20;
    else score += 5;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    
    // Penalties for patterns
    if (/^(123|abc|qwerty)/i.test(password)) score -= 20;
    if (password === password.toLowerCase()) score -= 5;
    if (password === password.toUpperCase()) score -= 5;
    
    return Math.max(0, Math.min(100, score));
}

// Check if password is in breach database
function isPasswordBreached(password) {
    return LOCAL_BREACH_DB.includes(password.toLowerCase());
}

// Create safety indicator
function createSafetyIndicator(password) {
    const breached = isPasswordBreached(password);
    const strength = calculatePasswordStrength(password);
    
    let status, color, message;
    
    if (breached) {
        status = '🚨 BREACHED';
        color = '#dc3545'; // Red
        message = 'This password appears in known breaches';
    } else if (strength < 40) {
        status = '⚠️ WEAK';
        color = '#ffc107'; // Yellow
        message = 'Consider strengthening this password';
    } else if (strength < 70) {
        status = '🟡 FAIR';
        color = '#fd7e14'; // Orange
        message = 'Moderate strength - could be better';
    } else {
        status = '✅ STRONG';
        color = '#28a745'; // Green
        message = 'Good password strength';
    }
    
    return { status, color, message, strength, breached };
}

// Add indicator to password field
function addIndicatorToField(field) {
    // Remove existing indicator
    const existing = field.parentNode.querySelector('.csp-indicator');
    if (existing) existing.remove();
    
    if (!field.value) return;
    
    const result = createSafetyIndicator(field.value);
    
    // Create indicator element
    const indicator = document.createElement('div');
    indicator.className = 'csp-indicator';
    indicator.innerHTML = `
        <div style="
            position: absolute;
            right: ${field.offsetWidth + 10}px;
            top: 50%;
            transform: translateY(-50%);
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            background: ${result.color};
            color: white;
            white-space: nowrap;
            z-index: 10000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            cursor: help;
            transition: all 0.3s ease;
        " title="${result.message} • Strength: ${result.strength}/100">
            ${result.status}
        </div>
    `;
    
    // Position relative parent
    if (getComputedStyle(field.parentNode).position === 'static') {
        field.parentNode.style.position = 'relative';
    }
    
    field.parentNode.appendChild(indicator);
    
    // Add hover effect
    indicator.onmouseenter = () => {
        indicator.firstElementChild.style.transform = 'translateY(-50%) scale(1.05)';
    };
    indicator.onmouseleave = () => {
        indicator.firstElementChild.style.transform = 'translateY(-50%) scale(1)';
    };
}

// Watch for password fields on the page
function initializePasswordWatcher() {
    // Initial scan for password fields
    document.querySelectorAll('input[type="password"]').forEach(field => {
        if (!field.dataset.cspInitialized) {
            field.dataset.cspInitialized = 'true';
            
            // Real-time checking
            field.addEventListener('input', () => {
                addIndicatorToField(field);
            });
            
            // Check on focus loss (blur event)
            field.addEventListener('blur', () => {
                addIndicatorToField(field);
            });
            
            // Initial check if field has a value
            if (field.value) {
                setTimeout(() => addIndicatorToField(field), 100);
            }
        }
    });
}

// Start watching for DOM changes (in case new password fields are added)
const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            shouldCheck = true;
        }
    });
    
    if (shouldCheck) {
        initializePasswordWatcher();
    }
});

// Start observing DOM changes
if (document.body) {
    initializePasswordWatcher();
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initializePasswordWatcher();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Add global styles for the safety indicator
const style = document.createElement('style');
style.textContent = `
    .csp-indicator {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .csp-indicator div:hover {
        box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
    }
`;
document.head.appendChild(style);

console.log('🔐 Password Smoke Detector initialized successfully');
