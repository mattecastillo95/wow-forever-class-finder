"use strict";
const STORAGE_KEY = "foreverClassFinder.v1";
const classes = {
  Druid: {
    roles: ["Tank", "Healer", "Melee DPS", "Ranged DPS"],
    fantasy: "Nature, forms, adaptability",
    range: "hybrid",
    complexity: 3,
    solo: 5,
    utility: 5,
    pvp: 4,
    pet: 1,
    stealth: 1,
    healing: 1,
    tanking: 1,
    professions: 4,
    specs: [
      ["Balance", "Ranged nature magic; spellcaster identity"],
      [
        "Feral",
        "Form-based melee and bear-tank path; verify current implementation",
      ],
      ["Restoration", "Proactive healing and sustained recovery"],
    ],
  },
  Hunter: {
    roles: ["Ranged DPS", "Melee DPS*"],
    fantasy: "Beasts, ranged weapons, traps",
    range: "ranged",
    complexity: 2,
    solo: 5,
    utility: 4,
    pvp: 5,
    pet: 3,
    stealth: 0,
    healing: 0,
    tanking: 0,
    professions: 5,
    specs: [
      ["Beast Mastery", "Pet-centered ranged damage"],
      ["Marksmanship", "Ranged weapon focus and precision"],
      ["Survival", "Hybrid identity and traps; verify current mechanics"],
    ],
  },
  Mage: {
    roles: ["Ranged DPS"],
    fantasy: "Arcane, fire, frost spellcraft",
    range: "ranged",
    complexity: 3,
    solo: 3,
    utility: 5,
    pvp: 5,
    pet: 0,
    stealth: 0,
    healing: 0,
    tanking: 0,
    professions: 3,
    specs: [
      ["Arcane", "Spell planning and distinctive magical rhythm"],
      ["Fire", "Aggressive spell damage and offensive momentum"],
      ["Frost", "Control, slows, and kiting"],
    ],
  },
  Paladin: {
    roles: ["Tank", "Healer", "Melee DPS"],
    fantasy: "Holy champion, plate, protection",
    range: "melee",
    complexity: 2,
    solo: 5,
    utility: 5,
    pvp: 4,
    pet: 0,
    stealth: 0,
    healing: 1,
    tanking: 1,
    professions: 3,
    specs: [
      ["Holy", "Healing and holy support"],
      ["Protection", "Tanking, durability, and positioning"],
      ["Retribution", "Melee damage with holy-warrior fantasy"],
    ],
  },
  Priest: {
    roles: ["Healer", "Ranged DPS"],
    fantasy: "Faith, healing, shields, shadow",
    range: "ranged",
    complexity: 3,
    solo: 3,
    utility: 5,
    pvp: 4,
    pet: 0,
    stealth: 0,
    healing: 1,
    tanking: 0,
    professions: 2,
    specs: [
      ["Discipline", "Healing and damage prevention"],
      ["Holy", "Direct healing and recovery"],
      ["Shadow", "Dark-magic ranged damage"],
    ],
  },
  Rogue: {
    roles: ["Melee DPS"],
    fantasy: "Stealth, poisons, tactical openings",
    range: "melee",
    complexity: 4,
    solo: 4,
    utility: 5,
    pvp: 5,
    pet: 0,
    stealth: 1,
    healing: 0,
    tanking: 0,
    professions: 4,
    specs: [
      ["Assassination", "Poison, bleed pressure, and target preparation"],
      ["Combat", "Direct, weapon-focused melee"],
      ["Subtlety", "Stealth, control, and tactical openings"],
    ],
  },
  Shaman: {
    roles: ["Healer", "Melee DPS", "Ranged DPS"],
    fantasy: "Elements, totems, weapon/spell hybrid",
    range: "hybrid",
    complexity: 4,
    solo: 4,
    utility: 5,
    pvp: 5,
    pet: 1,
    stealth: 0,
    healing: 1,
    tanking: 0,
    professions: 4,
    specs: [
      ["Elemental", "Ranged lightning/fire magic and elemental tools"],
      [
        "Enhancement",
        "Weapon-first elemental hybrid; workbook notes 2H emphasis in beta",
      ],
      ["Restoration", "Healing and group support tools"],
    ],
  },
  Warlock: {
    roles: ["Ranged DPS"],
    fantasy: "Demons, curses, dark magic",
    range: "ranged",
    complexity: 4,
    solo: 5,
    utility: 4,
    pvp: 4,
    pet: 3,
    stealth: 0,
    healing: 0,
    tanking: 0,
    professions: 4,
    specs: [
      ["Affliction", "Curses, damage over time, and sustained pressure"],
      ["Demonology", "Demons and pet synergy"],
      ["Destruction", "Direct offensive magic and big spell moments"],
    ],
  },
  Warrior: {
    roles: ["Tank", "Melee DPS"],
    fantasy: "Weapons, armor, direct physical combat",
    range: "melee",
    complexity: 2,
    solo: 3,
    utility: 3,
    pvp: 4,
    pet: 0,
    stealth: 0,
    healing: 0,
    tanking: 1,
    professions: 4,
    specs: [
      ["Arms", "Deliberate weapon strikes and tactical pressure"],
      ["Fury", "Aggressive, high-momentum melee"],
      ["Protection", "Tank; threat, mitigation, and group control"],
    ],
  },
};
const activities = [
  [
    "solo",
    "Solo questing & leveling",
    "Story, exploration, steady progress, self-reliance",
  ],
  [
    "dungeons",
    "Dungeons / 5-player PvE",
    "Coordination, mechanics, role responsibility",
  ],
  ["raids", "Raids", "Long encounters, team execution, preparation"],
  [
    "pvp",
    "PvP / world / battlegrounds",
    "Outplay, control, burst, survival, improvisation",
  ],
  [
    "professions",
    "Professions / economy",
    "Crafting, gathering, trading, self-sufficiency",
  ],
  [
    "fantasy",
    "Role-play / character fantasy",
    "Identity, lore, social storytelling",
  ],
  [
    "exploration",
    "Exploration / collections",
    "Hidden places, rare goals, optional objectives",
  ],
  [
    "friends",
    "Helping friends / flexible groups",
    "Adaptability, utility, filling needed roles",
  ],
];
const weightLabels = [
  ["solo", "Solo survivability"],
  ["flex", "Role flexibility"],
  ["range", "Melee/ranged fit"],
  ["complexity", "Low complexity"],
  ["utility", "Control / utility"],
  ["pet", "Pet / companion"],
  ["stealth", "Stealth"],
  ["healing", "Healing"],
  ["tanking", "Tanking"],
  ["pvp", "PvP toolkit"],
  ["fantasy", "Fantasy"],
  ["professions", "Farming / professions"],
];
const questions = [
  {
    id: "q1",
    title: "Q1. Where do you want to stand most of the time?",
    options: [
      ["melee", "In the enemy’s face, trading blows and managing danger."],
      ["ranged", "At range, landing spells or shots while controlling space."],
      ["mix", "A meaningful mix; switching range or form sounds fun."],
    ],
  },
  {
    id: "q2",
    title: "Q2. Which weapon fantasy pulls you in?",
    options: [
      ["heavy", "Heavy two-hander or dual-wielding: force and momentum."],
      [
        "shield",
        "Shield and weapon: resilience, control, protecting the line.",
      ],
      [
        "stealth",
        "Daggers, poisons, stealth tools: precision and preparation.",
      ],
      ["bow", "Bow/gun and ranged weapon: aim, spacing, companion."],
      ["magic", "Staff, wand, holy/shadow/arcane magic."],
      ["hybrid", "A hybrid: weapon attacks woven together with spells."],
    ],
  },
  {
    id: "q3",
    title: "Q3. Which rhythm would you enjoy repeating for hundreds of hours?",
    options: [
      ["direct", "Direct attacks and clear priorities."],
      ["tactical", "Tactical setup, debuffs, control, then payoff."],
      ["tools", "Managing pets, forms, totems, or several tools."],
      ["planning", "Resource planning, spell timing, and choosing answers."],
      ["adapt", "Adapting; no single rhythm needs to dominate."],
    ],
  },
  {
    id: "q4",
    title: "Q4. How much complexity do you want?",
    options: [
      ["low", "Low: compact toolkit and clear priorities."],
      ["moderate", "Moderate: several tools but a readable core loop."],
      ["high", "High: resource, timing, positioning, and utility decisions."],
      ["depth", "Depth is fine; frantic/button-mashy play is not."],
    ],
  },
  {
    id: "q5",
    title: "Q5. What recovery pace do you tolerate while leveling?",
    options: [
      ["minimal", "Minimal downtime; I want to keep moving."],
      ["some", "Some recovery if my toolkit is versatile."],
      ["slow", "A slower start for a rewarding late-game identity."],
      ["durable", "I want to feel durable, even if damage is slower."],
    ],
  },
  {
    id: "q6",
    title:
      "Q6. When an enemy hits harder than expected, what response feels best?",
    options: [
      ["outlast", "Outlast it through armor, healing, or defensive tools."],
      ["pet", "Let a pet absorb pressure while I attack."],
      ["control", "Control it, kite it, slow it, or avoid being hit."],
      ["burst", "Kill it quickly before it becomes a problem."],
      ["flex", "Change forms/tools and solve it flexibly."],
    ],
  },
  {
    id: "q7",
    title: "Q7. How important is soloing difficult optional content?",
    options: [
      [
        "essential",
        "Essential; I want to attempt elites and challenging quests alone.",
      ],
      [
        "important",
        "Important, but I can skip some encounters or return later.",
      ],
      ["group", "Not much; I expect to group for the hardest content."],
    ],
  },
  {
    id: "q8",
    title: "Q8. Pick your group responsibility for the next six months.",
    options: [
      ["tank", "Tank: pace, threat, positioning, protecting the group."],
      [
        "healer",
        "Healer: anticipate danger, manage resources, rescue mistakes.",
      ],
      ["dps", "DPS: mechanics, pressure, assigned utility."],
      ["dps2", "DPS first, but I want a credible second role."],
      ["multiple", "Multiple roles available on one character."],
    ],
  },
  {
    id: "q9",
    title: "Q9. Which responsibility sounds rewarding, not stressful?",
    options: [
      ["lead", "Everyone follows my pulls and positioning."],
      ["rescue", "I notice trouble early and keep the team alive."],
      ["execute", "I execute mechanics and damage reliably."],
      [
        "utility",
        "I bring crowd control, buffs, interrupts, dispels, or utility.",
      ],
      ["notfailure", "I prefer not being the group’s single point of failure."],
    ],
  },
  {
    id: "q10",
    title: "Q10. What would disappoint you most in raids?",
    options: [
      ["canttank", "Being unable to tank when I want to."],
      ["cantheal", "Being unable to heal when needed."],
      ["rotation", "Being pushed into a role/rotation I dislike."],
      ["utilitylack", "Having little unique utility beyond damage."],
      ["alt", "Needing another character for a different role."],
    ],
  },
  {
    id: "q11",
    title: "Q11. What is your attitude toward deliberate, tactical pulls?",
    options: [
      ["planning", "I like careful choices and planning."],
      ["fast", "I prefer a fast, fluid pace."],
      ["cc", "I enjoy crowd control and group tools."],
      ["target", "I focus on my target and execution."],
    ],
  },
  {
    id: "q12",
    title: "Q12. What makes a PvP win feel earned?",
    options: [
      ["endure", "Outlasting pressure in a long fight."],
      ["stealthburst", "Control, stealth, and a decisive burst."],
      ["precision", "Precise ranged damage and managing distance."],
      ["deny", "Interrupting, dispelling, kiting, or denying a plan."],
      ["meleepressure", "Direct melee pressure and timing."],
      ["support", "Supporting allies with healing, buffs, disruption."],
    ],
  },
  {
    id: "q13",
    title:
      "Q13. How do you feel about stealth and choosing when a fight begins?",
    options: [
      ["love", "Love it; choosing the opening is part of the skill."],
      ["useful", "Useful, but I don’t want stealth to define my class."],
      ["open", "I prefer facing enemies openly."],
      ["distance", "I prefer distance, traps, control, or escape tools."],
    ],
  },
  {
    id: "q14",
    title: "Q14. What makes a character feel like yours?",
    options: [
      ["weapons", "Iconic weapons, armor, straightforward warrior identity."],
      ["magic", "Faith, elements, nature, shadow, or arcane power fantasy."],
      ["companion", "A companion, beast, demon, or nature bond."],
      ["secrets", "Stealth, secrets, poisons, and tactical play."],
      ["service", "Healing, protection, leadership, service."],
      ["versatile", "Versatility across multiple roles and identities."],
    ],
  },
  {
    id: "q15",
    title: "Q15. How important are class tools outside damage?",
    options: [
      ["support", "Very: buffs, auras, totems, healing, resurrection."],
      ["control", "Very: control, escape, stealth, safe navigation."],
      ["utility", "Very: food, portals, summons, curses, pets."],
      ["theme", "Not essential; theme and combat matter more."],
    ],
  },
  {
    id: "q16",
    title: "Q16. What is your relationship with class fantasy?",
    options: [
      ["hard", "Hard requirement; gameplay cannot compensate."],
      ["important", "Important, but great gameplay can win me over."],
      ["mechanics", "Mechanics and roles matter more than theme."],
      ["both", "Both fantasy and gameplay need to fit."],
    ],
  },
  {
    id: "q17",
    title: "Q17. Which are genuine deal-breakers? Select all that apply.",
    multi: true,
    options: [
      ["noTank", "No tanking"],
      ["noHealing", "No healing"],
      ["noMelee", "No melee DPS"],
      ["noRanged", "No ranged DPS"],
      ["noStealth", "No stealth"],
      ["petManagement", "Pet management"],
      ["fragile", "Fragile solo play"],
      ["lowFlex", "Low role flexibility"],
      ["highComplexity", "High complexity"],
      ["noRecovery", "No self-recovery"],
      ["mostlyMelee", "Mostly melee"],
      ["mostlyRanged", "Mostly ranged"],
    ],
  },
  {
    id: "q18",
    title: "Q18. What are you willing to sacrifice?",
    options: [
      ["fantasy", "Faster leveling for fantasy I love."],
      ["flex", "Group flexibility for distinctive DPS."],
      ["complex", "Simplicity for more tools and choices."],
      ["damage", "Peak damage for survivability and utility."],
      ["solo", "Some solo comfort for my preferred group role."],
      ["broad", "Very little; I need broad comfort across activities."],
    ],
  },
];
const stages = [
  {
    name: "Play identity",
    desc: "Start with the fantasy and combat rhythm you would happily repeat for hundreds of hours.",
    kind: "questions",
    ids: ["q1", "q2", "q3", "q4", "q5"],
  },
  {
    name: "Your Azeroth",
    desc: "Distribute 100 points across the activities you realistically expect to play. A low-weight activity should not dominate unless it is non-negotiable.",
    kind: "activities",
  },
  {
    name: "Group role & lifestyle",
    desc: "Identify your group responsibilities, utility preferences, deal-breakers, and what you are willing to trade away.",
    kind: "questions",
    ids: [
      "q6",
      "q7",
      "q8",
      "q9",
      "q10",
      "q11",
      "q12",
      "q13",
      "q14",
      "q15",
      "q16",
      "q17",
      "q18",
    ],
  },
  {
    name: "Class shortlist",
    desc: "Apply hard gates first, then compare weighted compatibility. Review the logic before choosing specialization finalists.",
    kind: "shortlist",
  },
  {
    name: "Specialization & trial",
    desc: "Compare specializations, answer the final motivation questions, and get your personalized recommendation.",
    kind: "special",
  },
];
const defaults = () => ({
  answers: {},
  activity: {
    solo: 25,
    dungeons: 20,
    raids: 15,
    pvp: 10,
    professions: 8,
    fantasy: 8,
    exploration: 7,
    friends: 7,
  },
  weights: Object.fromEntries(weightLabels.map(([k]) => [k, 2])),
  specRatings: {},
  trialChecks: [],
  notes: "",
  finalAnswers: { q19: "", q20: "", q21: "", q22: "" },
  stage: 0,
  reviewed: false,
});
let state = defaults(),
  currentStage = 0,
  finalResult = null;
function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}
function load() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      state = { ...defaults(), ...JSON.parse(s) };
      state.answers ||= {};
      state.activity ||= defaults().activity;
      state.weights ||= defaults().weights;
      state.finalAnswers ||= defaults().finalAnswers;
      return true;
    }
  } catch (e) {}
  return false;
}
function show(id) {
  ["welcomeScreen", "assessmentScreen", "resultsScreen"].forEach((x) =>
    document.getElementById(x).classList.toggle("hidden", x !== id),
  );
  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}
function stagePills() {
  document.getElementById("stepPills").innerHTML = stages
    .map(
      (s, i) =>
        `<span class="step-pill ${i === currentStage ? "active" : i < currentStage ? "done" : ""}">${String(i + 1).padStart(2, "0")} · ${s.name}</span>`,
    )
    .join("");
}
function updateProgress() {
  let pct = Math.round((currentStage / 5) * 100);
  document.getElementById("stageLabel").textContent =
    `Stage ${currentStage + 1} of 5 · ${stages[currentStage].name}`;
  document.getElementById("progressLabel").textContent =
    `${pct}% through the journey`;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressBar").setAttribute("aria-valuenow", pct);
  document.getElementById("backBtn").disabled = currentStage === 0;
  document.getElementById("nextBtn").textContent =
    currentStage === 4 ? "Calculate my recommendation →" : "Continue →";
  stagePills();
}
function answerQuestion(q) {
  let val = state.answers[q.id];
  let selected = Array.isArray(val) ? val : val ? [val] : [];
  return `<div class="question"><p class="qtitle">${esc(q.title)}</p>${q.sub ? `<p class="qsub">${esc(q.sub)}</p>` : ""}<div class="options">$${q.options.map(([v, label]) => `<label class="option ${selected.includes(v) ? "selected" : ""}"><input type="${q.multi ? "checkbox" : "radio"}" name="${q.id}" value="${v}" ${selected.includes(v) ? "checked" : ""}><span>${esc(label)}</span></label>`).join("")}${q.id === "q17" ? `<label class="option ${selected.includes("none") ? "selected" : ""}"><input type="checkbox" name="q17" value="none" ${selected.includes("none") ? "checked" : ""}><span>No hard deal-breakers<small>Use this if none of the listed items is truly non-negotiable.</small></span></label>` : ""}</div></div>`;
}
function renderActivities() {
  let total = Object.values(state.activity).reduce(
    (a, b) => a + Number(b || 0),
    0,
  );
  return `<div class="section-head"><div class="eyebrow">Stage 2 · Activity mix</div><h1>Your Azeroth</h1><p>${esc(stages[1].desc)}</p></div>${activities.map(([k, label, desc]) => `<div class="activity-row"><div><label for="rng-${k}">${esc(label)}</label><small>${esc(desc)}</small></div><input aria-label="${esc(label)} points" class="field activity-number" type="number" min="0" max="100" id="num-${k}" data-activity="${k}" value="${Number(state.activity[k] || 0)}"><input type="range" id="rng-${k}" min="0" max="100" value="${Number(state.activity[k] || 0)}" data-activity="${k}" aria-label="${esc(label)} slider"></div>`).join("")}<div class="totalbar"><span>Activity points allocated</span><strong id="activityTotal" class="${total === 100 ? "" : "bad"}">${total} / 100</strong></div><p class="muted tiny">Use either the number field or slider. The tool will not silently move your points. The total must equal 100 to continue.</p>`;
}
function renderWeights() {
  return `<div class="question"><p class="qtitle">Priority weights</p><p class="qsub">How important is each factor? 1 = minor, 2 = useful, 3 = essential. These weights affect ranking, but do not replace the hard deal-breakers above.</p><div class="weight-grid">${weightLabels.map(([k, label]) => `<div class="weight-item"><label for="weight-${k}">${esc(label)}</label><select id="weight-${k}" data-weight="${k}">${[1, 2, 3].map((n) => `<option value="${n}" ${Number(state.weights[k] || 2) === n ? "selected" : ""}>${n} · ${["", "Minor", "Useful", "Essential"][n]}</option>`).join("")}</select></div>`).join("")}</div></div>`;
}
function computeClassScores() {
  const traits = {
    solo: 0,
    range: 0,
    roles: 0,
    utility: 0,
    pvp: 0,
    fantasy: 0,
    complexity: 0,
    professions: 0,
  };
  const add = (k, v) => (traits[k] = (traits[k] || 0) + v);
  const a = state.answers;
  const range =
    a.q1 === "melee"
      ? "melee"
      : a.q1 === "ranged"
        ? "ranged"
        : a.q1 === "mix"
          ? "hybrid"
          : null;
  const q2 = {
    heavy: ["Warrior", "Paladin", "Rogue"],
    shield: ["Paladin", "Warrior"],
    stealth: ["Rogue"],
    bow: ["Hunter"],
    magic: ["Mage", "Priest", "Warlock"],
    hybrid: ["Shaman", "Druid", "Paladin"],
  };
  const q3 = {
    direct: ["Warrior", "Paladin", "Hunter"],
    tactical: ["Rogue", "Mage", "Warlock"],
    tools: ["Druid", "Hunter", "Shaman", "Warlock"],
    planning: ["Mage", "Priest", "Warlock"],
    adapt: ["Druid", "Shaman", "Paladin"],
  };
  const q6 = {
    outlast: ["Paladin", "Warrior", "Druid", "Priest"],
    pet: ["Hunter", "Warlock"],
    control: ["Mage", "Rogue", "Hunter"],
    burst: ["Mage", "Warrior", "Rogue"],
    flex: ["Druid", "Shaman", "Paladin"],
  };
  const q12 = {
    endure: ["Paladin", "Warrior", "Druid"],
    stealthburst: ["Rogue"],
    precision: ["Hunter", "Mage"],
    deny: ["Mage", "Shaman", "Priest", "Rogue"],
    meleepressure: ["Warrior", "Paladin", "Shaman"],
    support: ["Priest", "Paladin", "Shaman", "Druid"],
  };
  const q14 = {
    weapons: ["Warrior", "Paladin"],
    magic: ["Mage", "Priest", "Shaman", "Druid", "Warlock"],
    companion: ["Hunter", "Warlock", "Druid"],
    secrets: ["Rogue"],
    service: ["Paladin", "Priest", "Druid", "Shaman"],
    versatile: ["Druid", "Paladin", "Shaman"],
  };
  const q15 = {
    support: ["Paladin", "Priest", "Shaman", "Druid"],
    control: ["Rogue", "Mage", "Hunter"],
    utility: ["Mage", "Warlock", "Hunter"],
    theme: [],
  };
  let base = {};
  Object.keys(classes).forEach(
    (c) =>
      (base[c] = { ...classes[c], name: c, raw: 0, dimensions: {}, why: [] }),
  );
  // Start each class at neutral; each answer contributes positive/negative fit signals.
  Object.entries(base).forEach(([c, p]) => {
    let raw = 0,
      why = [];
    if (range) {
      let fit =
        range === "hybrid"
          ? p.range === "hybrid"
            ? 5
            : p.range === "melee" || p.range === "ranged"
              ? 3
              : 2
          : p.range === range
            ? 5
            : p.range === "hybrid"
              ? 3
              : 1;
      raw += fit * 2;
      if (fit >= 4)
        why.push(
          `matches your ${range === "melee" ? "melee" : range === "ranged" ? "ranged" : "mixed-range"} combat preference`,
        );
    }
    const chosen = q2[a.q2] || [];
    raw += chosen.includes(c) ? 5 : 0;
    const r3 = q3[a.q3] || [];
    raw += r3.includes(c) ? 4 : 0;
    const q4 = a.q4;
    let complexityFit =
      q4 === "low"
        ? p.complexity <= 2
          ? 5
          : p.complexity === 3
            ? 3
            : 1
        : q4 === "moderate"
          ? p.complexity <= 3
            ? 5
            : 3
          : q4 === "high"
            ? p.complexity >= 3
              ? 5
              : 3
            : q4 === "depth"
              ? p.complexity >= 3
                ? 4
                : 4
              : 3;
    raw += complexityFit * 1.5;
    if (a.q5 === "minimal") raw += p.solo * 1.2;
    if (a.q5 === "durable") raw += (p.solo + p.tanking * 2) * 0.7;
    if (a.q5 === "some") raw += p.utility * 0.6;
    if (a.q5 === "slow" && p.complexity >= 3) raw += 1;
    if (a.q6) {
      let m = q6[a.q6] || [];
      raw += m.includes(c) ? 4 : 0;
    }
    if (a.q7 === "essential") raw += p.solo * 1.3;
    else if (a.q7 === "group") raw += p.roles.length > 1 ? 1 : 0;
    if (a.q8 === "tank") raw += p.tanking ? 9 : -2;
    if (a.q8 === "healer") raw += p.healing ? 9 : -2;
    if (a.q8 === "dps") raw += p.roles.some((r) => r.includes("DPS")) ? 3 : 0;
    if (a.q8 === "dps2") raw += p.roles.length >= 2 ? 5 : 1;
    if (a.q8 === "multiple") raw += p.roles.length * 1.8;
    if (a.q9 === "lead") raw += p.tanking ? 4 : 0;
    if (a.q9 === "rescue") raw += p.healing ? 4 : 0;
    if (a.q9 === "execute") raw += 3;
    if (a.q9 === "utility") raw += p.utility;
    if (a.q9 === "notfailure") raw += p.roles.length >= 2 ? 3 : 0;
    if (a.q10 === "canttank") raw += p.tanking ? 6 : -3;
    if (a.q10 === "cantheal") raw += p.healing ? 6 : -3;
    if (a.q10 === "utilitylack") raw += p.utility;
    if (a.q10 === "alt") raw += p.roles.length * 1.5;
    if (a.q11 === "planning")
      raw += ["Rogue", "Mage", "Warlock", "Priest"].includes(c) ? 2 : 0;
    if (a.q11 === "fast")
      raw += ["Warrior", "Hunter", "Shaman"].includes(c) ? 2 : 0;
    if (a.q11 === "cc") raw += p.utility * 0.7;
    if (a.q11 === "target")
      raw += ["Warrior", "Hunter", "Paladin"].includes(c) ? 2 : 0;
    if (a.q12) {
      let m = q12[a.q12] || [];
      raw += m.includes(c) ? 4 : 0;
    }
    if (a.q13 === "love") raw += p.stealth ? 8 : -1;
    if (a.q13 === "useful") raw += p.utility * 0.4;
    if (a.q13 === "open") raw += p.stealth ? -1 : 1;
    if (a.q13 === "distance")
      raw += ["Hunter", "Mage", "Druid"].includes(c) ? 3 : 0;
    if (a.q14) {
      let m = q14[a.q14] || [];
      raw += m.includes(c) ? 5 : 0;
    }
    if (a.q15) {
      let m = q15[a.q15] || [];
      raw += m.includes(c) ? 3 : 0;
    }
    if (a.q16 === "hard") raw += p.fantasy ? 0 : 0; // hard fantasy raises the importance of the fantasy weight below
    if (a.q18 === "fantasy") raw += p.fantasy ? 1 : 0;
    if (a.q18 === "flex") raw += p.roles.length <= 2 ? 1 : 0;
    if (a.q18 === "complex") raw += p.complexity >= 3 ? 2 : 0;
    if (a.q18 === "damage") raw += p.solo + p.utility;
    if (a.q18 === "solo") raw += p.roles.length > 1 ? 1 : 0;
    if (a.q18 === "broad") raw += p.solo + p.utility + p.roles.length;
    // Activity mix, applied as moderate evidence rather than overpowering non-negotiables.
    raw += Number(state.activity.solo || 0) * p.solo * 0.025;
    raw +=
      Number(state.activity.dungeons || 0) * p.utility * 0.02 +
      Number(state.activity.raids || 0) * p.roles.length * 0.018;
    raw +=
      Number(state.activity.pvp || 0) * p.pvp * 0.025 +
      Number(state.activity.fantasy || 0) * p.fantasy * 0.035;
    raw +=
      Number(state.activity.professions || 0) * p.professions * 0.025 +
      Number(state.activity.exploration || 0) * p.solo * 0.012 +
      Number(state.activity.friends || 0) * p.roles.length * 0.035;
    // Importance weights amplify corresponding fit signals, while preserving an interpretable 0-100 normalized result.
    const w = state.weights;
    raw += (p.solo - 3) * (Number(w.solo || 2) - 2) * 1.7;
    raw += (p.roles.length - 2) * (Number(w.flex || 2) - 2) * 2.0;
    raw +=
      ((range && p.range === range ? 1 : 0) - 0.4) *
      (Number(w.range || 2) - 2) *
      3;
    raw += ((5 - p.complexity) / 2 - 1) * (Number(w.complexity || 2) - 2) * 2;
    raw +=
      (p.utility - 3) * (Number(w.utility || 2) - 2) * 1.6 +
      (p.pet - 1) * (Number(w.pet || 2) - 2) * 1.5 +
      (p.stealth - 0.3) * (Number(w.stealth || 2) - 2) * 2;
    raw +=
      (p.healing - 0.3) * (Number(w.healing || 2) - 2) * 2 +
      (p.tanking - 0.3) * (Number(w.tanking || 2) - 2) * 2 +
      (p.pvp - 3) * (Number(w.pvp || 2) - 2) * 1.5;
    raw +=
      (p.fantasy - 3) * (Number(w.fantasy || 2) - 2) * 2 +
      (p.professions - 3) * (Number(w.professions || 2) - 2) * 1.4;
    base[c].raw = raw;
    base[c].why = why;
    base[c].dimensions = {
      "Solo comfort": Math.max(0, Math.min(5, Math.round(p.solo))),
      "Combat range & rhythm": Math.max(
        0,
        Math.min(
          5,
          Math.round(
            range && p.range === range ? 5 : p.range === "hybrid" ? 4 : 3,
          ),
        ),
      ),
      "Group role access": Math.max(
        0,
        Math.min(
          5,
          Math.round(
            p.roles.length === 4
              ? 5
              : p.roles.length === 3
                ? 4
                : p.roles.length === 2
                  ? 3
                  : 2,
          ),
        ),
      ),
      "Utility & control": Math.max(0, Math.min(5, Math.round(p.utility))),
      "PvP toolkit": Math.max(0, Math.min(5, Math.round(p.pvp))),
      "Fantasy & role-play": Math.max(0, Math.min(5, Math.round(p.fantasy))),
      "Complexity fit": Math.max(0, Math.min(5, Math.round(complexityFit))),
      "Farming & professions": Math.max(
        0,
        Math.min(5, Math.round(p.professions)),
      ),
    };
  });
  const deal = (
    Array.isArray(state.answers.q17) ? state.answers.q17 : []
  ).filter((x) => x !== "none");
  const excluded = {};
  Object.entries(base).forEach(([c, p]) => {
    let reasons = [];
    if (deal.includes("noTank") && !p.tanking)
      reasons.push("No tanking access");
    if (deal.includes("noHealing") && !p.healing)
      reasons.push("No healing access");
    if (
      deal.includes("noMelee") &&
      !["Druid", "Hunter", "Paladin", "Rogue", "Shaman", "Warrior"].includes(c)
    )
      reasons.push("No melee DPS access");
    if (deal.includes("noRanged") && !p.roles.includes("Ranged DPS"))
      reasons.push("No ranged DPS access");
    if (deal.includes("noStealth") && !p.stealth)
      reasons.push("No stealth identity");
    if (deal.includes("petManagement") && ["Hunter", "Warlock"].includes(c))
      reasons.push("Pet management is central to some specs");
    if (deal.includes("fragile") && p.solo < 4)
      reasons.push("Potentially weaker solo comfort");
    if (deal.includes("lowFlex") && p.roles.length < 3)
      reasons.push("Limited role flexibility");
    if (deal.includes("highComplexity") && p.complexity >= 4)
      reasons.push("Higher-complexity class identity");
    if (deal.includes("noRecovery") && p.solo < 4)
      reasons.push("Lower modeled solo comfort");
    if (deal.includes("mostlyMelee") && p.range === "melee")
      reasons.push("Mostly melee identity");
    if (deal.includes("mostlyRanged") && p.range === "ranged")
      reasons.push("Mostly ranged identity");
    excluded[c] = reasons;
  });
  const viable = Object.keys(base).filter((c) => excluded[c].length === 0);
  // Normalize only viable candidates to 0-100 for relative compatibility, not real-world performance.
  const vals = viable.map((c) => base[c].raw);
  let min = Math.min(...vals),
    max = Math.max(...vals);
  Object.keys(base).forEach(
    (c) =>
      (base[c].score = viable.includes(c)
        ? max === min
          ? 75
          : Math.round(60 + (40 * (base[c].raw - min)) / (max - min))
        : null),
  );
  return {
    base,
    excluded,
    viable,
    ranked: viable.map((c) => base[c]).sort((a, b) => b.raw - a.raw),
  };
}
function renderShortlist() {
  const result = computeClassScores();
  const ranked = result.ranked;
  let top = ranked.slice(0, 4);
  let noCandidates = result.viable.length === 0;
  return `<div class="section-head"><div class="eyebrow">Stage 4 · Class fit</div><h1>Your class shortlist</h1><p>${esc(stages[3].desc)}</p></div><div class="notice">Scoring note: the workbook defines the dimensions and 0–5 × weight method, but not a complete numerical answer-to-class matrix. This prototype uses a transparent, centralized heuristic mapping from your answers and the workbook’s class identities. Scores are relative compatibility indicators, not performance ratings.</div>${noCandidates ? `<div class="callout" style="margin-top:18px"><b>No candidates survive every selected deal-breaker.</b><p>That means your current non-negotiables conflict with the role/identity model. Go back and review Q17 rather than letting the tool quietly ignore a requirement.</p></div>` : `<h3 style="margin-top:24px">Your leading candidates</h3><div class="class-grid">${top.map((p, i) => `<article class="candidate"><div class="pill-row"><span class="tag ${i === 0 ? "gold" : ""}">${i === 0 ? "Current leader" : `Candidate ${i + 1}`}</span><span class="tag">${p.roles.join(" · ")}</span></div><h3 style="margin-top:10px">${esc(p.name)}</h3><p>${esc(p.fantasy)}</p><div class="scoreline"><span>Relative fit</span><strong>${p.score}%</strong></div><div class="meter"><div style="width:${p.score}%"></div></div><p>${esc(p.why.slice(0, 3).join("; ") || "This class remains viable under your current deal-breakers and fits a combination of your stated preferences.")}</p></article>`).join("")}</div>`}
<div class="question"><p class="qtitle">Deal-breaker audit</p><p class="qsub">The tool excludes candidates that violate your selected Q17 requirements. Check the result before moving on.</p><div class="class-grid">${Object.keys(
    classes,
  )
    .map(
      (c) =>
        `<div class="candidate"><h3>${esc(c)} ${result.excluded[c].length ? '<span class="tag">Excluded</span>' : '<span class="tag gold">Viable</span>'}</h3><p>${result.excluded[c].length ? esc(result.excluded[c].join(" · ")) : "No selected hard gate excludes this class."}</p></div>`,
    )
    .join(
      "",
    )}</div></div><div class="question"><p class="qtitle">Your three strongest needs</p><p class="qsub">Optional, but useful for making the final explanation more personal.</p><div class="options" style="grid-template-columns:1fr"><input class="field" id="need1" placeholder="1. Strongest need" value="${esc(state.answers.need1 || "")}"><input class="field" id="need2" placeholder="2. Second strongest need" value="${esc(state.answers.need2 || "")}"><input class="field" id="need3" placeholder="3. Third strongest need" value="${esc(state.answers.need3 || "")}"></div></div>`;
}
function renderSpecial() {
  let result = computeClassScores();
  let ranked = result.ranked;
  let candidates = ranked.slice(0, Math.min(4, ranked.length));
  let chosenClass = state.answers.chosenClass || candidates[0]?.name || "";
  return `<div class="section-head"><div class="eyebrow">Stage 5 · Specialization & trial</div><h1>Find your specialization</h1><p>${esc(stages[4].desc)}</p></div>${
    !candidates.length
      ? `<div class="callout">No viable classes remain. Go back to the class shortlist and review your hard exclusions.</div>`
      : `<div class="question"><p class="qtitle">Choose which shortlisted class to compare first</p><div class="options">${candidates.map((p) => `<label class="option ${chosenClass === p.name ? "selected" : ""}"><input type="radio" name="chosenClass" value="${esc(p.name)}" ${chosenClass === p.name ? "checked" : ""}><span><b>${esc(p.name)}</b><small>${p.score}% relative class fit</small></span></label>`).join("")}</div><p class="qsub">This selection focuses the specialization comparison; it does not automatically override the class ranking.</p></div>
<div id="specArea">${renderSpecArea(chosenClass, result)}</div>`
  }
<div class="question"><p class="qtitle">Final questions — motivation tie-breakers</p><p class="qsub">These matter most when scores are close. Answer based on what would keep you interested after the novelty wears off.</p>${[
    [
      "q19",
      "Q19. If two specs perform equally well, which loop would I choose on a tired evening?",
    ],
    ["q20", "Q20. Which downside am I most willing to accept?"],
    [
      "q21",
      "Q21. Which spec would I still want if it were not considered optimal?",
    ],
    [
      "q22",
      "Q22. Which one makes me curious enough to practice, fail, and improve?",
    ],
  ]
    .map(
      ([k, t]) =>
        `<div style="margin:12px 0"><label class="qtitle" for="${k}">${esc(t)}</label><textarea class="field decision-text" id="${k}" data-final="${k}" placeholder="Write your answer...">${esc(state.finalAnswers[k] || "")}</textarea></div>`,
    )
    .join("")}</div>
<div class="question"><p class="qtitle">Trial plan notes</p><p class="qsub">Optional: record anything you want the final trial checklist to focus on.</p><textarea class="field decision-text" id="trialNotes" placeholder="What do you want to pay attention to?">${esc(state.notes || "")}</textarea></div>`;
}
function renderSpecArea(className, result) {
  if (!className || !classes[className])
    return `<p class="muted">Select a viable class to see its specialization endpoints.</p>`;
  let c = classes[className];
  return `<div class="question"><p class="qtitle">${esc(className)} — specialization comparison</p><p class="qsub">The descriptions below are starting identities from your workbook. Rate your personal attraction to each specialization from 0–5; 0 means little interest and 5 means strong attraction. These ratings complement, rather than replace, your final answers.</p><div class="spec-grid">${c.specs
    .map(([name, desc]) => {
      let key = className + "::" + name;
      let rating = state.specRatings[key] ?? 3;
      return `<div class="spec-choice"><h4>${esc(name)}</h4><p>${esc(desc)}</p><label for="spec-${esc(name)}">Personal fit <b id="specval-${esc(name)}">${rating}/5</b></label><input type="range" min="0" max="5" value="${rating}" data-spec="${esc(key)}" id="spec-${esc(name)}" style="width:100%;accent-color:var(--gold)" aria-label="${esc(name)} personal fit"></div>`;
    })
    .join(
      "",
    )}</div><p class="muted tiny" style="margin-top:12px">If the class has a tank/healer/melee/ranged role you marked as essential, that requirement remains a hard gate. Confirm the exact Forever implementation of any uncertain spec mechanics in-game.</p></div>`;
}
function renderStage() {
  let s = stages[currentStage],
    content = "";
  if (s.kind === "questions") {
    content = `<div class="section-head"><div class="eyebrow">Stage ${currentStage + 1} · ${esc(s.name)}</div><h1>${esc(s.name)}</h1><p>${esc(s.desc)}</p></div>${s.ids.map((id) => answerQuestion(questions.find((q) => q.id === id))).join("")}${currentStage === 2 ? renderWeights() : ""}`;
  } else if (s.kind === "activities") content = renderActivities();
  else if (s.kind === "shortlist") content = renderShortlist();
  else content = renderSpecial();
  document.getElementById("stageContent").innerHTML = content;
  document.getElementById("validation").textContent = "";
  updateProgress();
  bindStageControls();
}
function bindStageControls() {
  document
    .querySelectorAll(
      "#stageContent input[type=radio],#stageContent input[type=checkbox]",
    )
    .forEach((el) =>
      el.addEventListener("change", () => {
        let qid = el.name;
        if (qid === "chosenClass") {
          state.answers.chosenClass = el.value;
          save();
          document.getElementById("specArea").innerHTML = renderSpecArea(
            el.value,
            computeClassScores(),
          );
          bindSpecControls();
          document
            .querySelectorAll('input[name="chosenClass"]')
            .forEach((x) =>
              x.closest(".option").classList.toggle("selected", x.checked),
            );
          return;
        }
        let q = questions.find((x) => x.id === qid);
        if (!q) return;
        if (q.multi) {
          let vals = [
            ...document.querySelectorAll(`input[name="${qid}"]:checked`),
          ].map((x) => x.value);
          if (vals.includes("none")) vals = ["none"];
          else vals = vals.filter((v) => v !== "none");
          state.answers[qid] = vals;
        } else state.answers[qid] = el.value;
        document
          .querySelectorAll(`input[name="${qid}"]`)
          .forEach((x) =>
            x.closest(".option").classList.toggle("selected", x.checked),
          );
        save();
      }),
    );
  document.querySelectorAll("[data-activity]").forEach((el) =>
    el.addEventListener("input", () => {
      let k = el.dataset.activity;
      let n = Math.max(0, Math.min(100, Number(el.value) || 0));
      state.activity[k] = n;
      document.querySelectorAll(`[data-activity="${k}"]`).forEach((x) => {
        if (x !== el) x.value = n;
      });
      let total = Object.values(state.activity).reduce(
        (a, b) => a + Number(b || 0),
        0,
      );
      let t = document.getElementById("activityTotal");
      if (t) {
        t.textContent = `${total} / 100`;
        t.classList.toggle("bad", total !== 100);
      }
      save();
    }),
  );
  document.querySelectorAll("[data-weight]").forEach((el) =>
    el.addEventListener("change", () => {
      state.weights[el.dataset.weight] = Number(el.value);
      save();
    }),
  );
  ["need1", "need2", "need3"].forEach((id) => {
    let el = document.getElementById(id);
    if (el)
      el.addEventListener("input", () => {
        state.answers[id] = el.value;
        save();
      });
  });
  document.querySelectorAll("[data-final]").forEach((el) =>
    el.addEventListener("input", () => {
      state.finalAnswers[el.dataset.final] = el.value;
      save();
    }),
  );
  let notes = document.getElementById("trialNotes");
  if (notes)
    notes.addEventListener("input", () => {
      state.notes = notes.value;
      save();
    });
  bindSpecControls();
}
function bindSpecControls() {
  document.querySelectorAll("[data-spec]").forEach((el) =>
    el.addEventListener("input", () => {
      state.specRatings[el.dataset.spec] = Number(el.value);
      let name = el.id.replace("spec-", "");
      let v = document.getElementById("specval-" + name);
      if (v) v.textContent = el.value + "/5";
      save();
    }),
  );
}
function validateStage() {
  let err = "";
  if (currentStage === 0) {
    let missing = stages[0].ids.filter((id) => !state.answers[id]);
    if (missing.length)
      err = "Please answer each question in this stage before continuing.";
  }
  if (currentStage === 1) {
    let total = Object.values(state.activity).reduce(
      (a, b) => a + Number(b || 0),
      0,
    );
    if (total !== 100)
      err = `Your activity points currently total ${total}. Please adjust them to exactly 100.`;
  }
  if (currentStage === 2) {
    let missing = stages[2].ids.filter(
      (id) =>
        !state.answers[id] ||
        (Array.isArray(state.answers[id]) && state.answers[id].length === 0),
    );
    if (missing.length)
      err =
        "Please answer each question in this stage. For Q17, select at least one deal-breaker only if you genuinely have one; otherwise choose the option below to indicate no deal-breakers.";
    if (!state.answers.q17) {
      state.answers.q17 = ["none"];
      save();
    }
  }
  if (currentStage === 3) {
    let r = computeClassScores();
    if (!r.viable.length)
      err =
        "No class survives the selected hard gates. Go back and review Q17, or adjust the answers that are not truly non-negotiable.";
  }
  document.getElementById("validation").textContent = err;
  return !err;
}
function buildResult() {
  const r = computeClassScores();
  let ranked = r.ranked;
  if (!ranked.length) return null;
  let top = ranked[0],
    second = ranked[1] || top;
  let className =
    state.answers.chosenClass && r.viable.includes(state.answers.chosenClass)
      ? state.answers.chosenClass
      : top.name;
  // If chosen class is close to leader, honor specialization preference; otherwise use class-fit leader.
  if (className !== top.name && top.raw - second.raw > Math.abs(top.raw) * 0.1)
    className = top.name;
  const selected = classes[className];
  let selectedProfile = ranked.find((p) => p.name === className) || top;
  let specScores = selected.specs.map(([name, desc], i) => {
    let key = className + "::" + name;
    let rating = Number(state.specRatings[key] ?? 3);
    let fit = rating * 12;
    let ans = state.finalAnswers;
    let text = [ans.q19, ans.q21, ans.q22]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    let bonus = 0;
    if (text.includes(name.toLowerCase())) bonus += 18;
    if (text.includes(className.toLowerCase())) bonus += 3;
    return { name, desc, rating, score: fit + bonus };
  });
  // Use Q19/Q21/Q22 textual preference if they name a spec, otherwise rely on explicit ratings.
  specScores.sort((a, b) => b.score - a.score);
  let winner = specScores[0],
    specRunner = specScores[1] || winner;
  const tied =
    ranked.length > 1 &&
    Math.abs(ranked[0].raw - ranked[1].raw) <=
      Math.max(1, Math.abs(ranked[0].raw) * 0.1);
  let confidence = "Moderate";
  if (!tied && winner.rating >= 4 && selectedProfile.score >= 85)
    confidence = "High";
  if (tied || winner.rating <= 2) confidence = "Tentative";
  let reasons = [];
  if (
    state.answers.q1 === "melee" &&
    ["Warrior", "Paladin", "Rogue", "Shaman", "Druid"].includes(className)
  )
    reasons.push(
      "Your preferred combat range points toward a melee or hybrid identity.",
    );
  if (
    state.answers.q1 === "ranged" &&
    ["Hunter", "Mage", "Priest", "Shaman", "Warlock", "Druid"].includes(
      className,
    )
  )
    reasons.push(
      "Your preferred combat range points toward ranged attacks or spellcasting.",
    );
  if (state.answers.q14) {
    let map = {
      weapons: "You value an iconic weapon-and-armor identity.",
      magic: "Magical or supernatural class fantasy is a strong draw for you.",
      companion:
        "Companion, beast, demon, or nature-bond fantasy matters to you.",
      secrets:
        "Stealth, secrets, poisons, and tactical openings appeal to you.",
      service:
        "Healing, protection, leadership, or service fits your preferred character identity.",
      versatile: "You value versatility across multiple roles and identities.",
    };
    if (map[state.answers.q14]) reasons.push(map[state.answers.q14]);
  }
  if (state.answers.q7 === "essential")
    reasons.push("Soloing challenging content is a priority in your answers.");
  if (state.answers.q8 === "tank")
    reasons.push("You chose tanking as your preferred group responsibility.");
  if (state.answers.q8 === "healer")
    reasons.push("You chose healing as your preferred group responsibility.");
  if (state.answers.q8 === "multiple" || state.answers.q8 === "dps2")
    reasons.push("You want meaningful role flexibility on one character.");
  if (state.answers.q16 === "hard")
    reasons.push(
      "You said class fantasy is a hard requirement, so the theme should be verified before commitment.",
    );
  if (!reasons.length)
    reasons.push(
      "This candidate ranked highest among the classes that survived your selected hard gates, using your answers and weighted preferences.",
    );
  if (state.answers.need1)
    reasons.unshift("Your stated top need: " + state.answers.need1 + ".");
  let sacrifices = [];
  if (state.answers.q18 === "fantasy")
    sacrifices.push(
      "You are willing to trade some leveling speed for a fantasy you love.",
    );
  if (state.answers.q18 === "flex")
    sacrifices.push(
      "You are willing to give up some group flexibility for a distinctive DPS identity.",
    );
  if (state.answers.q18 === "complex")
    sacrifices.push(
      "You are willing to accept more complexity for additional tools and choices.",
    );
  if (state.answers.q18 === "damage")
    sacrifices.push(
      "You prioritize survivability and utility over peak damage.",
    );
  if (state.answers.q18 === "solo")
    sacrifices.push(
      "You are willing to give up some solo comfort to get your preferred group role.",
    );
  if (state.answers.q18 === "broad")
    sacrifices.push(
      "You want broad comfort and are willing to sacrifice relatively little; validate any weaker dimensions before committing.",
    );
  if (!sacrifices.length)
    sacrifices.push(
      "Your answers did not identify one explicit sacrifice. Use the trial to find which drawback you are genuinely comfortable accepting.",
    );
  const dimensions = Object.entries(selectedProfile.dimensions).map(
    ([name, score]) => ({
      name,
      score,
      weight: Number(
        state.weights[
          {
            "Solo comfort": "solo",
            "Combat range & rhythm": "range",
            "Group role access": "flex",
            "Utility & control": "utility",
            "PvP toolkit": "pvp",
            "Fantasy & role-play": "fantasy",
            "Complexity fit": "complexity",
            "Farming & professions": "professions",
          }[name]
        ] || 2,
      ),
      contribution:
        score *
        Number(
          state.weights[
            {
              "Solo comfort": "solo",
              "Combat range & rhythm": "range",
              "Group role access": "flex",
              "Utility & control": "utility",
              "PvP toolkit": "pvp",
              "Fantasy & role-play": "fantasy",
              "Complexity fit": "complexity",
              "Farming & professions": "professions",
            }[name]
          ] || 2,
        ),
    }),
  );
  const deal = (
    Array.isArray(state.answers.q17) ? state.answers.q17 : []
  ).filter((x) => x !== "none");
  let runnerClass = ranked.find((p) => p.name !== className) || top;
  let runnerSpec = classes[runnerClass.name].specs[0];
  let runnerReason =
    runnerClass.name === top.name
      ? "Your next-best specialization within the leading class is " +
        specRunner.name +
        "."
      : `${runnerClass.name} remains your next-best class candidate at ${runnerClass.score}% relative fit.`;
  return {
    className,
    spec: winner.name,
    specDesc: winner.desc,
    specRating: winner.rating,
    specRunner,
    runnerClass,
    runnerSpec,
    top: selectedProfile,
    ranked,
    confidence,
    tied,
    reasons,
    sacrifices,
    dimensions,
    excluded: r.excluded,
    deal,
    activities: state.activity,
    weights: state.weights,
    runnerReason,
    notes: state.notes,
    finalAnswers: state.finalAnswers,
  };
}
function renderResults() {
  finalResult = buildResult();
  if (!finalResult) {
    document.getElementById("resultsScreen").innerHTML =
      `<div class="panel"><h2>No viable recommendation yet</h2><p>Your current hard exclusions eliminate all classes. Return to the assessment and review your Q17 selections.</p><button class="btn primary" id="returnAssessment">Return to assessment</button></div>`;
    show("resultsScreen");
    document.getElementById("returnAssessment").onclick = () => {
      currentStage = 2;
      renderStage();
      show("assessmentScreen");
    };
    return;
  }
  let r = finalResult;
  let specScore = Math.round(r.specRating * 20);
  let maxScore = r.dimensions.reduce((a, x) => a + x.contribution, 0);
  let maxPossible = r.dimensions.reduce((a, x) => a + 5 * x.weight, 0);
  let trial = [
    "First impression (15–20 min)",
    "Ordinary questing (30–45 min)",
    "Multiple-enemy problem",
    "Class tools and utility",
    "Group responsibility preview",
    "Return test on another day",
  ];
  let specialTrial =
    r.spec === "Beast Mastery"
      ? "Pay attention to whether pet interaction feels rewarding rather than like a chore."
      : r.spec === "Frost"
        ? "Test slows, kiting, and controlling the space around enemies."
        : r.spec === "Protection"
          ? "Test threat, mitigation, positioning, and whether group responsibility feels satisfying."
          : r.spec === "Restoration" ||
              r.spec === "Holy" ||
              r.spec === "Discipline"
            ? "Test whether anticipating damage and keeping allies alive feels engaging."
            : r.spec === "Subtlety" || r.spec === "Assassination"
              ? "Test stealth openings, control, and tactical setup."
              : r.spec === "Affliction"
                ? "Notice whether sustained pressure and managing effects remain satisfying."
                : r.spec === "Demonology"
                  ? "Notice whether demon/pet synergy feels central in a good way."
                  : r.spec === "Elemental"
                    ? "Test ranged elemental casting and utility."
                    : r.spec === "Enhancement"
                      ? "Test whether the weapon-first elemental hybrid loop feels satisfying."
                      : r.spec === "Balance"
                        ? "Test ranged nature magic and the spellcaster identity."
                        : r.spec === "Feral"
                          ? "Test form-based melee and verify the tank path in the current Forever client."
                          : r.spec === "Marksmanship"
                            ? "Notice whether your own ranged weapon attacks feel like the star."
                            : r.spec === "Survival"
                              ? "Verify the current hybrid/trap mechanics in the client and see whether the range mix appeals."
                              : r.spec === "Arcane"
                                ? "Pay attention to spell planning, resource rhythm, and timing."
                                : r.spec === "Fire"
                                  ? "Notice whether offensive momentum and spell impact stay satisfying."
                                  : r.spec === "Retribution"
                                    ? "Test whether melee damage with holy-warrior fantasy feels right."
                                    : r.spec === "Shadow"
                                      ? "Test whether dark-magic ranged damage fits your desired identity."
                                      : r.spec === "Arms"
                                        ? "Notice whether deliberate weapon strikes and tactical pressure appeal."
                                        : r.spec === "Fury"
                                          ? "Test whether the fast, aggressive melee rhythm is enjoyable over time."
                                          : r.spec === "Combat"
                                            ? "Test whether a direct, weapon-centered melee loop holds your attention."
                                            : r.spec === "Destruction"
                                              ? "Notice whether direct offensive magic and big spell moments feel satisfying."
                                              : "Pay attention to the ordinary combat loop and the responsibilities this specialization asks of you.";
  document.getElementById("resultsScreen").innerHTML = `
 <div class="screen"><div class="result-hero"><div class="eyebrow">Your personal recommendation</div><h1>${esc(r.className)}</h1><h2>${esc(r.spec)} · Your recommended forever main</h2><p>${esc(r.specDesc)}. This is the best-fit recommendation produced by your current answers—not a claim that this specialization is strongest in the current meta.</p><div class="pill-row"><span class="tag gold">${r.confidence} confidence</span><span class="tag">${r.top.score}% relative class fit</span><span class="tag">${specScore}% personal spec rating</span></div></div>
 <div class="result-columns"><section class="panel"><div class="eyebrow">01 · Why this fits</div><h2>Why this is your best fit</h2><ol class="reason-list">${r.reasons
   .slice(0, 5)
   .map((x) => `<li>${esc(x)}</li>`)
   .join(
     "",
   )}</ol><p class="muted tiny">These explanations are drawn from the answer patterns represented in this prototype. The score is a relative compatibility indicator, not an objective measurement of enjoyment.</p></section>
 <section class="panel"><div class="eyebrow">02 · Runner-up</div><h2>${esc(r.runnerClass.name)} · ${esc(r.runnerSpec[0])}</h2><p class="muted">${esc(r.runnerSpec[1])}</p><p>${esc(r.runnerReason)}</p><div class="scoreline"><span>Relative class fit</span><strong>${r.runnerClass.score}%</strong></div><div class="meter"><div style="width:${r.runnerClass.score}%"></div></div><p class="muted tiny">Your runner-up is a credible alternative, not a failed result. If the winner does not feel right in-game, test this option next.</p></section></div>
 <div class="result-columns"><section class="panel"><div class="eyebrow">03 · Score breakdown</div><h2>Your personal fit model</h2><p class="muted tiny">Dimension scores are 0–5. Each contribution equals score × importance weight. The table shows the workbook’s dimensions for the leading class.</p><table class="score-table"><thead><tr><th>Dimension</th><th>Score</th><th>Weight</th><th>Points</th></tr></thead><tbody>${r.dimensions.map((d) => `<tr><td>${esc(d.name)}</td><td>${d.score}/5</td><td>${d.weight}</td><td>${d.contribution}</td></tr>`).join("")}</tbody><tfoot><tr><th colspan="3">Weighted total (max ${maxPossible})</th><th>${maxScore}</th></tr></tfoot></table><p class="muted tiny">Note: the class ranking combines answers and activity preferences using a documented heuristic; the displayed 0–5 dimension values are a compact profile summary. This is not a calibrated statistical model.</p></section>
 <section class="panel"><div class="eyebrow">04 · Trade-offs</div><h2>The price of your choice</h2><ul class="reason-list">${r.sacrifices.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h3>What could change your mind?</h3><p class="muted">Reconsider if the everyday combat loop feels repetitive, the class fantasy loses its appeal after the novelty fades, a hard role requirement is not supported in the current client, or the runner-up feels better during the same trial.</p>${r.tied ? '<div class="notice">The top two classes are close under the workbook’s tie-handling principle. Treat the result as a shortlist and let in-game evidence decide.</div>' : ""}</section></div>
 <section class="panel" style="margin-top:16px"><div class="eyebrow">05 · Two-week trial plan</div><h2>Verify, don’t guess</h2><p class="muted">${esc(specialTrial)} Complete these steps and record what you actually feel, not what you think you should feel.</p><div class="trial-list">${trial.map((t, i) => `<label class="trial-item"><input type="checkbox" data-trial="${i}" ${state.trialChecks.includes(i) ? "checked" : ""}><span><b>${esc(t)}</b><small>${esc(["Do basic attacks/spells feel satisfying? Do you understand the core job?", "How often do you stop to recover? Do you feel fragile, powerful, bored, or engaged?", "Can you control danger? What happens when a pull goes wrong?", "Try buffs, crowd control, pet/forms/totems/stealth/healing where applicable. Do you want to use them?", "Read a current dungeon/raid guide. Does the responsibility sound fun or like a chore?", "Return another day. If it still attracts you after novelty fades, that is useful evidence."][i])}</small></span></label>`).join("")}</div><div style="margin-top:14px"><label class="qtitle" for="resultNotes">Trial observations</label><textarea class="field decision-text" id="resultNotes" placeholder="What felt good? What felt frustrating?">${esc(state.notes || "")}</textarea></div></section>
 <section class="panel" style="margin-top:16px"><div class="eyebrow">06 · Decision record</div><h2>Keep your decision</h2><div class="review-grid"><div class="review-card"><b>Top class</b><p>${esc(r.className)}</p></div><div class="review-card"><b>Top specialization</b><p>${esc(r.spec)}</p></div><div class="review-card"><b>Runner-up</b><p>${esc(r.runnerClass.name)} · ${esc(r.runnerSpec[0])}</p></div><div class="review-card"><b>Biggest accepted compromise</b><p>${esc(r.sacrifices[0])}</p></div></div><p style="margin-top:16px"><b>Three strongest reasons</b></p><ol class="reason-list">${r.reasons
   .slice(0, 3)
   .map((x) => `<li>${esc(x)}</li>`)
   .join(
     "",
   )}</ol><p class="muted tiny">What would make you reconsider after two weeks? Revisit your trial notes and compare the winner with the runner-up before rerolling because of one bad pull or a temporary meta claim.</p><div class="pill-row"><button class="btn primary" id="copyDecision">Copy decision record</button><button class="btn" id="printResults">Print / Save as PDF</button><button class="btn" id="editAnswers">Review my answers</button></div><p id="copyStatus" class="muted tiny" aria-live="polite"></p></section>
 <p class="footer-note">This assessment uses the PDF’s class framework and starting identities. Confirm uncertain Forever mechanics against the current client. The best answer is the intersection of fantasy, ordinary gameplay, role access, and long-term motivation—not simply the most checkmarks.</p></div>`;
  show("resultsScreen");
  document.querySelectorAll("[data-trial]").forEach((el) =>
    el.addEventListener("change", () => {
      let i = Number(el.dataset.trial);
      state.trialChecks = el.checked
        ? [...new Set([...state.trialChecks, i])]
        : state.trialChecks.filter((x) => x !== i);
      save();
    }),
  );
  document.getElementById("resultNotes").addEventListener("input", (e) => {
    state.notes = e.target.value;
    save();
  });
  document.getElementById("copyDecision").onclick = async () => {
    let text = `THE FOREVER CLASS FINDER — DECISION RECORD\nTop class: ${r.className}\nTop specialization: ${r.spec}\nRunner-up: ${r.runnerClass.name} — ${r.runnerSpec[0]}\nConfidence: ${r.confidence}\nTop reasons:\n${r.reasons
      .slice(0, 3)
      .map((x, i) => `${i + 1}. ${x}`)
      .join(
        "\n",
      )}\nBiggest compromise: ${r.sacrifices[0]}\nTrial notes: ${state.notes || "Not yet recorded"}\n\nThis is a personal-fit recommendation based on my answers, not a meta ranking.`;
    try {
      await navigator.clipboard.writeText(text);
      document.getElementById("copyStatus").textContent =
        "Decision record copied.";
    } catch (e) {
      document.getElementById("copyStatus").textContent = text;
    }
  };
  document.getElementById("printResults").onclick = () => window.print();
  document.getElementById("editAnswers").onclick = () => {
    currentStage = 0;
    renderStage();
    show("assessmentScreen");
  };
}
document.getElementById("beginBtn").onclick = () => {
  currentStage = 0;
  show("assessmentScreen");
  renderStage();
};
document.getElementById("backBtn").onclick = () => {
  if (currentStage > 0) {
    currentStage--;
    renderStage();
  }
};
document.getElementById("nextBtn").onclick = () => {
  if (!validateStage()) return;
  if (currentStage < 4) {
    currentStage++;
    renderStage();
    save();
  } else {
    save();
    renderResults();
  }
};
document.getElementById("saveBtn").onclick = () => {
  let ok = save();
  let old = document.getElementById("saveBtn").textContent;
  document.getElementById("saveBtn").textContent = ok
    ? "Progress saved"
    : "Save unavailable";
  setTimeout(
    () => (document.getElementById("saveBtn").textContent = old),
    1600,
  );
};
document.getElementById("resetBtn").onclick = () => {
  if (confirm("Start over and clear your saved assessment answers?")) {
    state = defaults();
    currentStage = 0;
    finalResult = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    show("welcomeScreen");
  }
};
const loaded = load();
