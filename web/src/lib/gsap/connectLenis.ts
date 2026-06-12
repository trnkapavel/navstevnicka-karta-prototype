import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap/register";

export function connectLenisScroll(lenis: Lenis) {
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({
    pinType: "transform",
  });

  ScrollTrigger.addEventListener("refresh", () => {
    lenis.resize();
  });
}

export function refreshScrollLayout() {
  ScrollTrigger.refresh();
}
