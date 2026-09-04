export function initScrubLines() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nodes = document.querySelectorAll<HTMLElement>("[data-scrub-lines]");

  nodes.forEach((node) => {
    if (node.dataset.scrubReady) return;
    const text = node.textContent?.trim() ?? "";
    if (!text) return;

    const words = text.split(/\s+/);
    node.textContent = "";
    node.classList.add("is-ready");
    node.dataset.scrubReady = "1";

    const measure = document.createElement("span");
    measure.style.cssText =
      "position:absolute;visibility:hidden;white-space:nowrap;font:inherit";
    node.appendChild(measure);

    const max = Math.max(node.clientWidth, 320);
    let currentText = "";
    let line = makeLine(node);
    let inner = line.firstElementChild as HTMLElement;

    words.forEach((word) => {
      const trial = currentText ? `${currentText} ${word}` : word;
      measure.textContent = trial;
      if (currentText && measure.offsetWidth > max) {
        line = makeLine(node);
        inner = line.firstElementChild as HTMLElement;
        currentText = word;
        inner.textContent = word;
      } else {
        currentText = trial;
        inner.textContent = trial;
      }
    });

    measure.remove();

    if (reduced) {
      node.querySelectorAll(".scrub-line").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          [...node.querySelectorAll(".scrub-line")].forEach((el, i) => {
            window.setTimeout(() => el.classList.add("is-in"), i * 90);
          });
          io.disconnect();
        });
      },
      { threshold: 0.35 },
    );
    io.observe(node);
  });
}

function makeLine(parent: HTMLElement) {
  const line = document.createElement("span");
  line.className = "scrub-line";
  const inner = document.createElement("span");
  line.appendChild(inner);
  parent.appendChild(line);
  return line;
}
