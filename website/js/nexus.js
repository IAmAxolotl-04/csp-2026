// ============================================
// NEXUS AUDIT — Enhanced Mechanical Simulation
// ============================================

// Global State
let auditRunning = false;
let currentStep = 0;
let engineRPM = 0;
let steamPressure = 220;
let torque = 145;
let temperature = 187;
let rpmInterval = null;

// Simulation Steps
const simSteps = [
    "[SYSTEM] Firing steam cores...",
    "[SYSTEM] Pressurizing main chamber...",
    "[CRYPTO] Aligning brass encryption nodes...",
    "[MECH] Cycling clockwork dials...",
    "[AUDIT] Scanning credential manifest...",
    "[AUDIT] • ADMIN:J.Reyes - ARGON2|9f8d...e3a1",
    "[AUDIT] • USER:M.Chen - ARGON2|4c7b...b9f2",
    "[AUDIT] • SVC:API_GW - ARGON2|a1b2...c3d4",
    "[AUDIT] • USER:T.Sato - ARGON2|d5e6...f7a8",
    "[PRIVACY] Generating blinded OPRF tokens...",
    "[PRIVACY] Tokenization complete",
    "[NETWORK] Transmitting to Nexus Server...",
    "[SERVER] Server-blind processing...",
    "[ANALYSIS] Computing risk matrix...",
    "[RESULTS] • CRITICAL: SVC:API_GW (95% confidence)",
    "[RESULTS] • ELEVATED: ADMIN:J.Reyes (87% confidence)",
    "[RESULTS] • NOMINAL: USER:M.Chen (12% confidence)",
    "[RESULTS] • LOW: USER:T.Sato (5% confidence)",
    "[SECURITY] Zero data exposure verified",
    "[SYSTEM] Audit COMPLETE — MECHANICAL INTEGRITY STABLE"
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("NEXUS JS Loaded — Mechanical Edition");
    
    // Initialize animations
    initGearsAnimation();
    initAxolotlAnimation();
    
    // Update metrics display
    updateEngineMetrics();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initial terminal message
    logToTerminal("› Mechanical Console Online — Ready for Audit Sequence");
});

// ============================================
// TERMINAL FUNCTIONS
// ============================================

function logToTerminal(message) {
    const terminal = document.getElementById("terminal");
    if (!terminal) return;
    
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = message;
    
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
    const terminal = document.getElementById("terminal");
    if (terminal) {
        terminal.innerHTML = "";
    }
}

function updateTerminalStatus(status, color) {
    const statusElement = document.getElementById("terminalStatus");
    if (statusElement) {
        statusElement.textContent = status;
        statusElement.style.color = color;
        statusElement.style.borderColor = color;
        statusElement.style.background = color + "20";
    }
}

// ============================================
// AUDIT SIMULATION
// ============================================

function startFullDemo() {
    if (auditRunning) return;
    
    auditRunning = true;
    currentStep = 0;
    
    clearTerminal();
    updateTerminalStatus("PROCESSING", "#ffaa00");
    startEngine();
    
    // Start simulation
    simulateAuditStep();
}

function stepDemo() {
    if (auditRunning || currentStep >= simSteps.length) return;
    
    auditRunning = true;
    updateTerminalStatus("STEPPING", "#00aaff");
    
    if (currentStep === 0) {
        clearTerminal();
        startEngine();
    }
    
    simulateSingleStep();
}

function resetDemo() {
    auditRunning = false;
    currentStep = 0;
    stopEngine();
    
    clearTerminal();
    updateTerminalStatus("READY", "#9cdc7c");
    
    // Initial messages
    logToTerminal("› Mechanical Console Online");
    logToTerminal("› Steam pressure: NOMINAL");
    logToTerminal("› Brass nodes: ALIGNED");
    logToTerminal('› Type "audit" or press LAUNCH');
    logToTerminal(" ");
    logToTerminal("█");
}

function simulateAuditStep() {
    if (currentStep >= simSteps.length) {
        auditRunning = false;
        updateTerminalStatus("COMPLETE", "#00ff88");
        stopEngine();
        
        setTimeout(() => {
            logToTerminal(" ");
            logToTerminal("› Audit protocol terminated successfully.");
            logToTerminal("› Mechanical integrity: VERIFIED");
            logToTerminal(" ");
            logToTerminal("█");
        }, 500);
        
        return;
    }
    
    const message = simSteps[currentStep];
    
    // Update engine metrics based on step
    updateEngineDuringAudit();
    
    // Log to terminal
    logToTerminal(message);
    
    currentStep++;
    
    // Schedule next step
    setTimeout(simulateAuditStep, 700);
}

function simulateSingleStep() {
    if (currentStep >= simSteps.length) {
        auditRunning = false;
        updateTerminalStatus("READY", "#9cdc7c");
        stopEngine();
        return;
    }
    
    const message = simSteps[currentStep];
    updateEngineDuringAudit();
    logToTerminal(message);
    
    currentStep++;
    auditRunning = false;
    updateTerminalStatus("READY", "#9cdc7c");
}

// ============================================
// ENGINE ANIMATIONS
// ============================================

function initGearsAnimation() {
    const canvas = document.getElementById("gearsCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let gearAngle1 = 0;
    let gearAngle2 = 0;
    let gearAngle3 = 0;
    
    function drawGears() {
        // Clear canvas
        ctx.fillStyle = "#0c0b09";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw background grid
        ctx.strokeStyle = "#2c241f";
        ctx.lineWidth = 1;
        
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Main gear (center)
        drawGear(ctx, centerX, centerY, 60, 16, gearAngle1, "#c4976b", "#7a5f3d");
        
        // Top-left gear
        drawGear(ctx, centerX - 100, centerY - 60, 35, 12, -gearAngle2, "#b87333", "#8a5a2b");
        
        // Bottom-right gear
        drawGear(ctx, centerX + 100, centerY + 60, 40, 14, gearAngle3, "#d4af7f", "#a87f4d");
        
        // Connect gears with axles
        ctx.strokeStyle = "#7a5f3d";
        ctx.lineWidth = 4;
        
        // Main axle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.stroke();
        
        // Small axles
        ctx.beginPath();
        ctx.arc(centerX - 100, centerY - 60, 6, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(centerX + 100, centerY + 60, 6, 0, Math.PI * 2);
        ctx.stroke();
        
        // Update angles based on engine state
        const speedMultiplier = engineRPM / 1000;
        gearAngle1 += 0.02 * speedMultiplier;
        gearAngle2 += 0.03 * speedMultiplier;
        gearAngle3 += 0.025 * speedMultiplier;
        
        requestAnimationFrame(drawGears);
    }
    
    function drawGear(ctx, x, y, radius, teeth, angle, fillColor, strokeColor) {
        // Gear body
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Gear teeth
        ctx.fillStyle = strokeColor;
        const toothLength = radius * 0.3;
        
        for (let i = 0; i < teeth; i++) {
            const toothAngle = angle + (i * (Math.PI * 2 / teeth));
            const toothX = x + Math.cos(toothAngle) * (radius + toothLength/2);
            const toothY = y + Math.sin(toothAngle) * (radius + toothLength/2);
            
            ctx.save();
            ctx.translate(toothX, toothY);
            ctx.rotate(toothAngle);
            
            // Use rect instead of roundRect for compatibility
            ctx.beginPath();
            ctx.rect(-toothLength/2, -toothLength/2, toothLength, toothLength);
            ctx.fill();
            
            ctx.restore();
        }
        
        // Inner circle
        ctx.fillStyle = "#0c0b09";
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Bolt holes
        ctx.fillStyle = strokeColor;
        for (let i = 0; i < 6; i++) {
            const holeAngle = (i * (Math.PI * 2 / 6));
            const holeX = x + Math.cos(holeAngle) * (radius * 0.6);
            const holeY = y + Math.sin(holeAngle) * (radius * 0.6);
            
            ctx.beginPath();
            ctx.arc(holeX, holeY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawGears();
}

function initAxolotlAnimation() {
    const canvas = document.getElementById("axolotlCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let frame = 0;
    let bobOffset = 0;
    
    function drawAxolotl() {
        // Clear with gradient
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, canvas.width
        );
        gradient.addColorStop(0, "#141214");
        gradient.addColorStop(1, "#0c0b09");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Body wave
        bobOffset = Math.sin(frame * 0.08) * 5;
        
        // Body
        ctx.fillStyle = "#d4af7f";
        ctx.strokeStyle = "#7a5f3d";
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + bobOffset, 40, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Head
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 20 + bobOffset, 20, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Gills (animated)
        ctx.fillStyle = "#b87333";
        for (let i = 0; i < 4; i++) {
            const gillX = centerX - 15 + i * 10;
            const gillY = centerY - 5 + bobOffset + Math.sin(frame * 0.1 + i) * 3;
            
            ctx.beginPath();
            ctx.ellipse(gillX, gillY, 4, 8, Math.PI/4 + Math.sin(frame * 0.05 + i) * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Tail
        ctx.beginPath();
        ctx.moveTo(centerX + 40, centerY + bobOffset);
        ctx.quadraticCurveTo(
            centerX + 70, centerY + bobOffset + 15,
            centerX + 60, centerY + bobOffset - 10
        );
        ctx.quadraticCurveTo(
            centerX + 50, centerY + bobOffset - 20,
            centerX + 40, centerY + bobOffset
        );
        ctx.fill();
        ctx.stroke();
        
        // Eyes
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(centerX - 8, centerY - 22 + bobOffset, 4, 0, Math.PI * 2);
        ctx.arc(centerX + 8, centerY - 22 + bobOffset, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils (follow mouse/cursor)
        ctx.fillStyle = "#000000";
        const pupilOffset = Math.sin(frame * 0.05) * 1.5;
        ctx.beginPath();
        ctx.arc(centerX - 8 + pupilOffset, centerY - 22 + bobOffset, 2, 0, Math.PI * 2);
        ctx.arc(centerX + 8 + pupilOffset, centerY - 22 + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth
        ctx.strokeStyle = "#7a5f3d";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 12 + bobOffset, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();
        
        // Decorative rivets
        ctx.fillStyle = "#c4976b";
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2 / 8);
            const rivetX = centerX + Math.cos(angle) * 45;
            const rivetY = centerY + Math.sin(angle) * 30 + bobOffset;
            
            ctx.beginPath();
            ctx.arc(rivetX, rivetY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        frame++;
        requestAnimationFrame(drawAxolotl);
    }
    
    drawAxolotl();
}

// ============================================
// ENGINE CONTROL
// ============================================

function startEngine() {
    engineRPM = 850;
    steamPressure = 320;
    torque = 210;
    temperature = 215;
    
    updateEngineMetrics();
    
    // Clear any existing interval
    if (rpmInterval) {
        clearInterval(rpmInterval);
    }
    
    // Start RPM pulsing
    rpmInterval = setInterval(() => {
        if (!auditRunning) {
            clearInterval(rpmInterval);
            return;
        }
        
        engineRPM = 800 + Math.sin(Date.now() * 0.003) * 50;
        updateEngineMetrics();
    }, 100);
}

function stopEngine() {
    engineRPM = 0;
    steamPressure = 220;
    torque = 145;
    temperature = 187;
    
    if (rpmInterval) {
        clearInterval(rpmInterval);
        rpmInterval = null;
    }
    
    updateEngineMetrics();
}

function updateEngineDuringAudit() {
    // Simulate engine stress during audit
    steamPressure = 250 + Math.random() * 100;
    torque = 180 + Math.random() * 60;
    temperature = 200 + Math.random() * 30;
    
    updateEngineMetrics();
}

function updateEngineMetrics() {
    // Update RPM display
    const rpmElement = document.getElementById("engineRPM");
    if (rpmElement) {
        rpmElement.textContent = Math.round(engineRPM) + " RPM";
        rpmElement.style.color = engineRPM > 0 ? "#ffaa00" : "#9cdc7c";
    }
    
    // Update metric displays
    const steamElement = document.getElementById("steamPressure");
    const torqueElement = document.getElementById("torque");
    const tempElement = document.getElementById("temperature");
    
    if (steamElement) steamElement.textContent = Math.round(steamPressure) + " PSI";
    if (torqueElement) torqueElement.textContent = Math.round(torque) + " N·m";
    if (tempElement) {
        tempElement.textContent = Math.round(temperature) + "°C";
        
        // Color code temperature
        if (temperature > 230) {
            tempElement.style.color = "#ff5555";
        } else if (temperature > 210) {
            tempElement.style.color = "#ffaa00";
        } else {
            tempElement.style.color = "#9cdc7c";
        }
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function setupKeyboardShortcuts() {
    document.addEventListener("keydown", function(event) {
        // Ctrl + Enter to start full demo
        if (event.ctrlKey && event.key === "Enter") {
            event.preventDefault();
            startFullDemo();
        }
        
        // Space for step mode
        if (event.key === " " && !event.ctrlKey && !auditRunning) {
            event.preventDefault();
            stepDemo();
        }
        
        // Escape to reset
        if (event.key === "Escape") {
            resetDemo();
        }
        
        // Clear terminal with Ctrl+L
        if (event.ctrlKey && event.key.toLowerCase() === "l") {
            event.preventDefault();
            clearTerminal();
            logToTerminal("› Terminal cleared");
            logToTerminal("█");
        }
    });
}

// ============================================
// PUBLIC API
// ============================================

window.startFullDemo = startFullDemo;
window.stepDemo = stepDemo;
window.resetDemo = resetDemo;
window.logToTerminal = logToTerminal;

// Initialize on load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("NEXUS Mechanical Audit initialized");
        logToTerminal("› System initialized — Ready for commands");
    });
} else {
    console.log("NEXUS Mechanical Audit initialized");
    logToTerminal("› System initialized — Ready for commands");
}
