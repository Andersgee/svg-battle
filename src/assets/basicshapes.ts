import type { Targets } from "src/pages/index";

/** for the basic shapes section (this corresponds to real targets) */
export const basicshapes: (Targets[number] & { description: string })[] = [
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
    id: 10,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#fcd34d" height="100%" width="100%"></rect><line stroke="#d97706" stroke-width="10" y2="180" x2="180" y1="60" x1="60"></line></svg>`,
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
