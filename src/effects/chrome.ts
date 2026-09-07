import gsap from "gsap";

export function runLoader(onDone: () => void) {
  const loader = document.querySelector<HTMLElement>(".loader");
  const count = document.querySelector<HTMLElement>(".loader__count");
  if (!loader || !count || loader.dataset.ran === "1") {
    onDone();
    return;
  }
  loader.dataset.ran = "1";

  document.body.classList.add("is-loading");
  const state = { value: 0 };

  gsap.to(state, {
    value: 100,
    duration: 1.15,
    ease: "power2.inOut",
    onUpdate: () => {
      count.textContent = String(Math.round(state.value)).padStart(3, "0");
    },
    onComplete: () => {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.querySelector(".opening")?.classList.add("is-ready");
      onDone();
    },
  });
}

export function initRailTheme() {
  const rail = document.querySelector<HTMLElement>(".side-rail");
  const top = document.querySelector<HTMLElement>(".top-cta");
  const sections = [...document.querySelectorAll<HTMLElement>("[data-theme]")];
  if (!rail || !sections.length) return () => undefined;

  const links = [...rail.querySelectorAll<HTMLElement>(".nav-link")];
  const foot = rail.querySelector<HTMLElement>(".rail-foot");

  const themeAt = (viewportY: number) => {
    const y = window.scrollY + viewportY;
    let theme = "dark";
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const topY = rect.top + window.scrollY;
      const bottomY = topY + rect.height;
      if (y >= topY && y < bottomY) {
        theme = section.dataset.theme || "dark";
        break;
      }
    }
    return theme;
  };

  const sync = () => {
    const brand = rail.querySelector<HTMLElement>(".brand");
    const brandY = brand
      ? brand.getBoundingClientRect().top + brand.offsetHeight / 2
      : window.innerHeight * 0.12;
    rail.setAttribute("data-rail", themeAt(brandY));

    links.forEach((link) => {
      const y = link.getBoundingClientRect().top + link.offsetHeight / 2;
      link.dataset.rail = themeAt(y);
    });

    if (foot) {
      const y = foot.getBoundingClientRect().top + foot.offsetHeight / 2;
      foot.dataset.rail = themeAt(y);
    }

    if (top) {
      const y = top.getBoundingClientRect().top + top.offsetHeight / 2;
      top.setAttribute("data-rail", themeAt(y));
    }
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  return () => {
    window.removeEventListener("scroll", sync);
    window.removeEventListener("resize", sync);
  };
}

export function initRailMarker() {
  const marker = document.querySelector<HTMLElement>(".rail-marker");
  const links = [...document.querySelectorAll<HTMLElement>(".side-rail .nav-link")];
  if (!marker || !links.length) return () => undefined;

  const ids = links.map((link) => link.getAttribute("href")?.slice(1) || "");

  const sync = () => {
    let active = 0;
    ids.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.42) active = index;
    });
    links.forEach((link, index) => {
      link.classList.toggle("is-active", index === active);
    });
    const target = links[active];
    marker.style.top = `${target.offsetTop + target.offsetHeight / 2 - 7}px`;
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  return () => window.removeEventListener("scroll", sync);
}

export function initMobileCta() {
  const cta = document.querySelector<HTMLElement>(".mobile-cta");
  if (!cta) return () => undefined;
  const onScroll = () => {
    cta.classList.toggle("is-in", window.scrollY > window.innerHeight * 0.55);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}