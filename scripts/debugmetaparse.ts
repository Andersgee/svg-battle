import * as meta from "../src/utils/svgmetaparse";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><circle cx="120" cy="120" r="110" fill="#f5f3ff"></circle><path d="M 180 60 c -120 -20 -120 40 -60 60 s 60 90 -66 50" clip-path="path('M 0 20 L 240 200 v -220')" stroke-linecap="butt" fill="none" stroke="#0284c7" stroke-width="40"></path><path d="M 180 60 c -120 -20 -120 40 -60 60 s 60 90 -66 50" clip-path="path('M 0 40 L 240 220 v 20 h -240')" stroke-linecap="butt" fill="none" stroke="#0c4a6e" stroke-width="40"></path><path d="M 180 60 c -120 -20 -120 40 -60 60 s 60 90 -66 50" clip-path="path('M 0 20 L 240 200 v 20 L 0 40')" stroke-linecap="butt" fill="none" stroke="#f97316" stroke-width="40"></path></svg>`;

const colors = meta.colorValuesString(svg);
const tags = meta.tagNamesString(svg);

console.log({ svg, tags, colors });
