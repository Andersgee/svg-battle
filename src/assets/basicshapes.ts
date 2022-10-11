import type { Targets } from "src/pages/index";

type HardcodedTargets = (Targets[number] & { description: string })[];

/** for the basic shapes section (this corresponds to real targets) */
export const basicshapes: HardcodedTargets = [
  {
    title: "rect",
    id: 7,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#38bdf8" height="100%" width="100%"></rect><rect fill="#0284c7" height="120" width="120" y="120" x="120"></rect></svg>`,
    description: "This battle introduces the rect element.",
  },
  {
    title: "circle",
    id: 8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#f0abfc" height="100%" width="100%"></rect><circle fill="#c026d3" r="80" cy="120" cx="120"></circle></svg>`,
    description: "This battle introduces the circle element.",
  },
  {
    title: "ellipse",
    id: 9,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#86efac" height="100%" width="100%"></rect><ellipse fill="#16a34a" ry="50" rx="100" cy="120" cx="120"></ellipse></svg>`,
    description: "This battle introduces the ellipse element.",
  },
  {
    title: "line",
    id: 13,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#fcd34d" height="100%" width="100%"></rect><line stroke="#d97706" stroke-width="20" y2="180" x2="180" y1="60" x1="60"></line></svg>`,
    description: "This battle introduces the line element.",
  },
  {
    title: "polyline",
    id: 11,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#fdba74" height="100%" width="100%"></rect><polyline points="30,120,90,180,150,60,210,120" stroke-width="20" stroke="#ea580c" fill="none"></polyline></svg>`,
    description: "This battle introduces the polyline element.",
  },
  {
    title: "polygon",
    id: 12,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#cbd5e1" height="100%" width="100%"></rect><polygon points="30,120,90,180,150,60,210,120" fill="#475569"></polygon></svg>`,
    description: "This battle introduces the polygon element.",
  },
];

export const pathshapes: HardcodedTargets = [
  {
    title: "quadratic bézier",
    id: 16,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#c4b5fd" height="100%" width="100%"></rect><path fill="none" stroke="#7c3aed" stroke-width="20" d="M 60 120 q 30 -120 60 0 t 60 0"></path></svg>`,
    description:
      "This battle introduces the [quatradic bézier commands](https://www.w3.org/TR/SVG2/paths.html#PathDataQuadraticBezierCommands)",
  },
  {
    title: "cubic bézier",
    id: 15,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect width="100%" height="100%" fill="#5eead4"></rect><path d="M 60 120 c 0 -120 60,-120 60 0 s 60 120 60 0" stroke-width="20" stroke="#0d9488" fill="none"></path></svg>`,
    description:
      "This battle introduces the [cubic bézier commands](https://www.w3.org/TR/SVG2/paths.html#PathDataCubicBezierCommands)",
  },
  {
    title: "elliptical arc",
    id: 17,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect width="100%" height="100%" fill="#fda4af"></rect><path d="M 60 120 a 30 60 0 1 1 60 0 a 30 60 0 1 0 60 0" stroke-width="20" stroke="#e11d48" fill="none"></path></svg>`,
    description:
      "This battle introduces the [elliptical arc commands](https://www.w3.org/TR/SVG2/paths.html#PathDataEllipticalArcCommands)",
  },
];
