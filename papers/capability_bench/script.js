const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const timelineTabs = [...document.querySelectorAll(".timeline-tab")];
const timelineStage = document.querySelector(".timeline-stage");
const timelineProgress = document.querySelector(".timeline-track i");
const timelineShell = document.querySelector(".timeline-shell");
const desktopTimeline = window.matchMedia("(min-width: 981px)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let timelineFrame = 0;

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  body.classList.toggle("menu-open", !isOpen);
}

function selectTimelineTab(tab) {
  const step = Number(tab.dataset.step);
  timelineTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  timelineStage.dataset.step = String(step);
  timelineStage.querySelector(".stage-time").textContent = tab.dataset.time;
  timelineStage.querySelector(".stage-status span").textContent = tab.dataset.status;
  timelineStage.querySelector("h3").textContent = tab.dataset.title;
  timelineStage.querySelector(".stage-copy > p:nth-of-type(3)").textContent = tab.dataset.copy;
  timelineStage.querySelector(".task-current").textContent = tab.dataset.current;
  timelineStage.querySelector(".task-pending").textContent = tab.dataset.pending;
  timelineStage.querySelector(".task-memory").textContent = tab.dataset.memory;
  const clock = tab.dataset.time.endsWith("+") ? "08:15:02" : `${tab.dataset.time}:00`;
  timelineStage.querySelector(".stage-toolbar time").textContent = `day 01 · ${clock}`;
  timelineProgress.style.setProperty("--timeline-progress", `${step * 25}%`);
}

function timelineScrollPosition(step) {
  const headerHeight = document.querySelector(".site-header").offsetHeight;
  const start = timelineShell.offsetTop - headerHeight;
  const distance = Math.max(1, timelineShell.offsetHeight - window.innerHeight + headerHeight);
  return start + (step / (timelineTabs.length - 1)) * distance;
}

function selectAndRevealTimelineTab(tab) {
  selectTimelineTab(tab);
  if (!desktopTimeline.matches || prefersReducedMotion.matches) return;
  window.scrollTo({ top: timelineScrollPosition(Number(tab.dataset.step)), behavior: "smooth" });
}

function updateTimelineFromScroll() {
  timelineFrame = 0;
  if (!desktopTimeline.matches || prefersReducedMotion.matches) return;
  const start = timelineScrollPosition(0);
  const end = timelineScrollPosition(timelineTabs.length - 1);
  const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
  const step = Math.round(progress * (timelineTabs.length - 1));
  if (timelineStage.dataset.step !== String(step)) selectTimelineTab(timelineTabs[step]);
}

function requestTimelineUpdate() {
  if (timelineFrame) return;
  timelineFrame = window.requestAnimationFrame(updateTimelineFromScroll);
}

function handleTimelineKeys(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = timelineTabs.indexOf(event.currentTarget);
  let next = event.key === "ArrowRight" ? current + 1 : current - 1;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = timelineTabs.length - 1;
  next = Math.max(0, Math.min(timelineTabs.length - 1, next));
  timelineTabs[next].focus();
  selectAndRevealTimelineTab(timelineTabs[next]);
}

function initSectionObserver() {
  const sections = document.querySelectorAll("[data-section]");
  const links = [...document.querySelectorAll(".site-nav a[href^='#']")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach((link) => link.classList.toggle("is-current", link.hash === `#${id}`));
      entry.target.classList.add("is-visible");
    });
  }, { rootMargin: "-25% 0px -60%", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}

function initHeroParallax() {
  const world = document.querySelector(".hero-world");
  if (!world || prefersReducedMotion.matches) return;
  world.addEventListener("pointermove", (event) => {
    const bounds = world.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    world.style.setProperty("--world-x", `${x * 8}px`);
    world.style.setProperty("--world-y", `${y * 8}px`);
  });
  world.addEventListener("pointerleave", () => {
    world.style.setProperty("--world-x", "0px");
    world.style.setProperty("--world-y", "0px");
  });
}

async function copyCitation() {
  const button = document.querySelector(".copy-citation");
  const text = document.querySelector("#bibtex").innerText;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = "Copy BibTeX"; }, 1800);
  } catch {
    button.textContent = "Select citation below";
  }
}

menuButton.addEventListener("click", toggleMenu);
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
timelineTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectAndRevealTimelineTab(tab));
  tab.addEventListener("keydown", handleTimelineKeys);
});
document.querySelector(".copy-citation").addEventListener("click", copyCitation);
window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
window.addEventListener("resize", requestTimelineUpdate);

selectTimelineTab(timelineTabs[0]);
initSectionObserver();
initHeroParallax();
requestTimelineUpdate();
