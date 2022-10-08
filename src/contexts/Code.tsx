import React, { useState, createContext, useContext, useEffect } from "react";
import DOMPurify from "dompurify";
import { useImageDataFromSvg } from "src/hooks/useImageData";

/*
const placeholder = `<rect x="24" y="24" width="10" height="10" fill="#00c"/>
<circle cx="24" cy="24" r="10" fill="#00c"/>`;
*/

/*
const placeholder = `<svg width="100px" height="100px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<rect x="24" y="24" width="10" height="10" fill="#00c"/>
<circle cx="24" cy="24" r="10" fill="#00c"/>
</svg>
`;

*/
//<circle cx="240" cy="240" r="240" fill="#00c"/>

interface Props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  sanitizedCode: string;
  imageData?: ImageData;
}

const defaultValue: Props = {
  code: "",
  setCode: () => null,
  sanitizedCode: "",
};

const CodeContext = createContext(defaultValue);

interface ProviderProps {
  children: React.ReactNode;
}

const WIDTH = 240;
const HEIGHT = 240;

export function CodeProvider({ children }: ProviderProps) {
  const [code, setCode] = useState("");
  const [sanitizedCode, setSanitizedCode] = useState("");
  const imageData = useImageDataFromSvg(sanitizedCode, WIDTH, HEIGHT);

  useEffect(() => {
    const clean = sanitize(
      `<svg width="${WIDTH}px" height="${HEIGHT}px" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">${code}</svg>`,
    );
    //console.log("clean:", clean);
    if (clean) {
      setSanitizedCode(clean);
    }
  }, [code]);

  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,
        sanitizedCode,
        imageData,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}

export const useCodeContext = () => useContext(CodeContext);

///////////////////
// utils

/*
var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.

var svgDisallowed = Object.freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);

var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
*/

/** allow all safe SVG elements and SVG Filters, no HTML or MathML */
export function sanitize(dirty: string) {
  try {
    const str = DOMPurify.sanitize(dirty, {
      USE_PROFILES: { svg: true, svgFilters: true },
      //FORBID_ATTR: ["style"],
      //FORBID_TAGS: ["#text"],
      KEEP_CONTENT: false,
    });

    return str;
  } catch (err) {
    console.log(err);
    return "";
  }
}
