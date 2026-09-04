import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add("lenis", "lenis-smooth");

  return lenis;
}

export function initAnimateChars() {
  document.querySelectorAll("[data-button-animate-chars]").forEach((node) => {
    if (node.getAttribute("data-chars-done")) return;
    const text = node.textContent ?? "";
    node.textContent = "";
    Array.from(text).forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${index * 0.012}s`;
      if (char === " ") span.style.whiteSpace = "pre";
      node.appendChild(span);
    });
    node.setAttribute("data-chars-done", "1");
  });
}

export function initReveals() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return () => undefined;
  }

  const reveal = (node: Element) => {
    node.classList.add("is-in");
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: [0, 0.05, 0.15], rootMargin: "0px 0px -5% 0px" },
  );

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (visible) {
      reveal(node);
      return;
    }
    io.observe(node);
  });

  return () => io.disconnect();
}
