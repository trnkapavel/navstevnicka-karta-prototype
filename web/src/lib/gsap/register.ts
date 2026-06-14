import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registruje GSAP pluginy — musí proběhnout před jakýmkoli useGSAP / ScrollTrigger. */
export function registerGsapPlugins() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

if (typeof window !== "undefined") {
  registerGsapPlugins();
}

export { gsap, ScrollTrigger, useGSAP };
