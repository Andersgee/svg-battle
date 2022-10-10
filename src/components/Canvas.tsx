import { useRef } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";
import { useCompareOutputTarget, usePutImageData } from "src/hooks/useImageData";

const canvasStyle = "block h-[240px] w-[240px] outline outline-1 outline-neutral-300 dark:outline-neutral-700";
//const canvasStyle = "outline- block h-[240px] w-[240px]";

export function CanvasCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useCodeContext();
  usePutImageData(canvasRef, imageData);

  return <canvas ref={canvasRef} className={canvasStyle} />;
}

export function CanvasTarget() {
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useTargetContext();
  usePutImageData(codeCanvasRef, imageData);

  return <canvas ref={codeCanvasRef} className={canvasStyle} />;
}

export function CanvasDebug() {
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useCompareOutputTarget();
  usePutImageData(codeCanvasRef, imageData);

  return <canvas ref={codeCanvasRef} className={canvasStyle} />;
}
