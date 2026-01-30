// =========================
// NEXUS DEMO JS
// =========================

// AXOLOTL PIXELATED ANIMATION
const canvas = document.getElementById('axolotlCanvas');
const ctx = canvas.getContext('2d');

let frame = 0;
function drawAxolotl() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Body
    ctx.fillStyle = '#0ff';
    ctx.fillRect(10, 20 + Math.sin(frame*0.3)*2, 30, 10);

    // Head
    ctx.fillStyle = '#f0f';
    ctx.fillRect(20, 10 + Math.sin(frame*0.3)*2, 10, 10);

    // Tail
    ctx.fillStyle = '#0ff';
    ctx.fillRect(5, 20 + Math.sin(frame*0.3)*2, 5, 10);

    frame++;
    requestAnimationFrame(drawAxolotl);
}
drawAxolotl();

// =========================
// DEMO CONSOLE
// =========================
const consoleEl = document.getElementById('console');
const messages = [
    '[ SYSTEM ] Initializing Nexus Audit...',
    '[ SYSTEM ] Loading risk matrix...',
    '[ USER:M.Chen ] Hash check complete',
    '[ USER:T.Sato ] Hash check complete',
    '[ SVC:API_GW ] ALERT: CRITICAL',
    '[ ADMIN:J.Reyes ] ELEVATED',
    '[ SYSTEM ] Audit complete ?'
];

let msgIndex = 0;

function startDemo() {
    consoleEl.textContent = '';
    msgIndex = 0;
    typeMessage();
}

function typeMessage() {
    if (msgIndex < messages.length) {
        consoleEl.textContent += messages[msgIndex] + '\n';
        msgIndex++;
        setTimeout(typeMessage, 800);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
}

function resetDemo() {
    consoleEl.textContent = '';
    msgIndex = 0;
}
