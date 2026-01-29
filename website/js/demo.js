const Theme = {
  Primary: 'primary',
  Secondary: 'secondary',
  Neutral: 'neutral',
  Success: 'success',
  Alert: 'alert',
  System: 'system'
};

const Timing = { Short:300, Medium:600, Long:900 };

const LocalAccounts = [
  { User:"ADMIN:J.Reyes", Hash:"ARGON2|9f8d...e3a1" },
  { User:"USER:M.Chen",  Hash:"ARGON2|4c7b...b9f2" },
  { User:"SVC:API_GW",   Hash:"ARGON2|a1b2...c3d4" },
  { User:"USER:T.Sato",  Hash:"ARGON2|d5e6...f7a8" }
];

const RiskMatrix = [
  { User:"ADMIN:J.Reyes", Risk:"ELEVATED", Confidence:87, Bar:15 },
  { User:"USER:M.Chen",  Risk:"NOMINAL",  Confidence:12, Bar:4 },
  { User:"SVC:API_GW",   Risk:"CRITICAL", Confidence:95, Bar:20 },
  { User:"USER:T.Sato",  Risk:"LOW", Confidence:5, Bar:2 }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const section = t => `<div class="${Theme.System}">[ ${t} ]</div>`;
const info = (t,c=Theme.Neutral) => `<div class="${c}">${t}</div>`;

async function runDemo() {
  document.getElementById("title-sequence").innerHTML = `
<div class="primary">╔══════════════════════════════════════╗</div>
<div class="primary">║ CSP‑V2: NEXUS AUDIT PROTOCOL          ║</div>
<div class="primary">╚══════════════════════════════════════╝</div>`;
  await sleep(Timing.Medium);

  document.getElementById("principle").innerHTML =
    section("PRINCIPLE") +
    info("Shift: Exact Match → Risk Scoring","success") +
    info("Vector: Batch Processing | Server‑Blind Architecture","primary");
  await sleep(Timing.Medium);

  document.getElementById("client").innerHTML =
    section("CLIENT NODE") +
    info("Preparing local credential manifest...");
  LocalAccounts.forEach(a=>{
    document.getElementById("client").innerHTML +=
      `<div>> ${a.User.padEnd(15)} ${a.Hash}</div>`;
  });

  document.getElementById("privacy").innerHTML =
    section("PRIVACY ENGINE") +
    info("Generating blinded OPRF tokens...");
  ["TOKENIZE","BLIND","SHUFFLE","SEAL"].forEach(t=>{
    document.getElementById("privacy").innerHTML +=
      `<div class="secondary">[${t}]</div>`;
  });

  document.getElementById("transmission").innerHTML =
    section("TRANSMISSION") +
    info("Sending blinded tokens to Nexus...") +
    `<div id="transmission-line"></div>`;

  const line = "─".repeat(30);
  for (let i=0;i<line.length;i++){
    const s=document.createElement("span");
    s.className=i%3===0?"primary":"secondary";
    s.textContent=line[i];
    document.getElementById("transmission-line").appendChild(s);
    await sleep(25);
  }
  document.getElementById("transmission-line").innerHTML +=
    `<span class="success"> ✓</span>`;

  document.getElementById("risk-matrix").innerHTML =
    section("RISK MATRIX") +
    info("Decrypting and analyzing results locally...");
  RiskMatrix.forEach(r=>{
    document.getElementById("risk-matrix").innerHTML +=
      `<div>${r.User.padEnd(15)} [${"█".repeat(r.Bar).padEnd(20)}] ${r.Risk} (${r.Confidence}% conf)</div>`;
  });

  document.getElementById("closing").innerHTML =
    section("PROTOCOL V2") +
    info("Shift complete: Hash Matching → Risk Intelligence","primary") +
    info("Build: Open Source | Zero Budget | PowerShell","success") +
    info("Audit simulation complete.","system");
}

runDemo();
