const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const demo = document.querySelector(".agent-demo");
const demoButtons = [...document.querySelectorAll(".demo-controls button[data-action]")];
const sceneButtons = [...document.querySelectorAll(".environment-tabs button")];
const sceneImage = document.querySelector(".environment-frame img");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const demoStates = [
  {
    clock: "08:00:00", status: "instruction received", instruction: "Wash the dishes in the kitchen.",
    feedback: "Select “Wash dishes” to begin. The oven and residents continue independently while the robot acts.",
    active: "wash dishes", pending: "none", memory: "08:00 · request received",
    log: [["08:00", "resident", "wash the dishes"], ["—", "world", "waiting"], ["—", "robot", "waiting"]],
  },
  {
    clock: "08:02:14", status: "action in progress", instruction: "Finish washing the dishes.",
    feedback: "Dishwashing is underway. A resident has also asked: take the pizza out when the oven is ready.",
    active: "wash dishes", pending: "pizza · when ready", memory: "08:02 · future request stored",
    log: [["08:00", "robot", "washing dishes"], ["08:02", "resident", "future request"], ["—", "world", "oven heating"]],
  },
  {
    clock: "08:15:00", status: "world event detected", instruction: "The oven has finished heating.",
    feedback: "Time advanced while the robot worked. The stored condition now matches a public world event.",
    active: "wash dishes", pending: "pizza · ready now", memory: "oven event matched to request",
    log: [["08:02", "resident", "future request"], ["08:15", "world", "oven finished heating"], ["—", "robot", "decision required"]],
  },
  {
    clock: "08:15:31", status: "time-critical response", instruction: "Take the pizza out of the oven.",
    feedback: "The robot interrupts its current work and handles the condition before it expires.",
    active: "take out pizza", pending: "resume wash dishes", memory: "original goal remains active",
    log: [["08:15", "world", "oven ready"], ["08:15", "robot", "interrupt accepted"], ["08:15", "robot", "pizza retrieved"]],
  },
  {
    clock: "08:16:04", status: "original task resumed", instruction: "Return to the unfinished dishes.",
    feedback: "The event-conditioned request is complete, but the earlier goal was not discarded. The agent resumes it.",
    active: "wash dishes", pending: "none", memory: "08:15 · pizza handled",
    log: [["08:15", "robot", "pizza retrieved"], ["08:16", "scheduler", "prior goal restored"], ["08:16", "robot", "washing resumed"]],
  },
];

const scenes = {
  apartment: { src: "assets/apartment.webp", name: "Compact home", meta: "5 rooms · seed 42 · complete layout", alt: "Complete generated compact-home layout" },
  house: { src: "assets/house.webp", name: "Large home", meta: "11 rooms · seed 42 · complete layout", alt: "Complete generated large-house layout" },
  office: { src: "assets/office.webp", name: "Office", meta: "office domain · seed 42 · complete layout", alt: "Complete generated office layout" },
};

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function renderDemo(step) {
  const state = demoStates[step];
  demo.dataset.demoStep = String(step);
  demo.querySelector(".demo-clock").textContent = state.clock;
  demo.querySelector(".demo-status").textContent = state.status;
  demo.querySelector(".demo-instruction").textContent = state.instruction;
  demo.querySelector(".demo-feedback").textContent = state.feedback;
  demo.querySelector(".state-active").textContent = state.active;
  demo.querySelector(".state-pending").textContent = state.pending;
  demo.querySelector(".state-memory").textContent = state.memory;
  const rows = demo.querySelectorAll(".event-log li");
  state.log.forEach((entry, index) => {
    rows[index].querySelector("time").textContent = entry[0];
    rows[index].querySelector("span").textContent = entry[1];
    rows[index].querySelector("b").textContent = entry[2];
    rows[index].classList.toggle("is-current", index === state.log.length - 1);
  });
  demoButtons.forEach((button) => {
    if (button.dataset.action === "reset") return;
    const buttonStep = ["work", "wait", "respond", "resume"].indexOf(button.dataset.action);
    button.disabled = buttonStep !== step;
    button.classList.toggle("is-used", buttonStep < step);
  });
}

function handleDemoAction(action) {
  if (action === "reset") return renderDemo(0);
  const step = Number(demo.dataset.demoStep);
  if (step < demoStates.length - 1) renderDemo(step + 1);
}

function selectScene(button) {
  const scene = scenes[button.dataset.scene];
  sceneButtons.forEach((item) => {
    const selected = item === button;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelector(".environment-viewer").setAttribute("aria-labelledby", button.id);
  sceneImage.style.opacity = "0";
  window.setTimeout(() => {
    sceneImage.src = scene.src;
    sceneImage.alt = scene.alt;
    document.querySelector(".scene-name").textContent = scene.name;
    document.querySelector(".scene-meta").textContent = scene.meta;
    sceneImage.style.opacity = "1";
  }, reducedMotion.matches ? 0 : 150);
}

function handleSceneKeys(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = sceneButtons.indexOf(event.currentTarget);
  let next = event.key === "ArrowRight" ? current + 1 : current - 1;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = sceneButtons.length - 1;
  next = (next + sceneButtons.length) % sceneButtons.length;
  sceneButtons[next].focus();
  selectScene(sceneButtons[next]);
}

function observeSections() {
  const links = [...nav.querySelectorAll("a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("is-current", link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -62%", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}

async function copyCitation() {
  const button = document.querySelector(".copy-citation");
  try {
    await navigator.clipboard.writeText(document.querySelector("#bibtex").innerText);
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = "Copy BibTeX"; }, 1600);
  } catch {
    button.textContent = "Select text below";
  }
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
demoButtons.forEach((button) => button.addEventListener("click", () => handleDemoAction(button.dataset.action)));
sceneButtons.forEach((button) => {
  button.addEventListener("click", () => selectScene(button));
  button.addEventListener("keydown", handleSceneKeys);
});
document.querySelector(".copy-citation").addEventListener("click", copyCitation);

renderDemo(0);
sceneButtons.slice(1).forEach((button) => { const image = new Image(); image.src = scenes[button.dataset.scene].src; });
observeSections();
