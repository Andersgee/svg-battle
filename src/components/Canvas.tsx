import { useRef } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";
import { useCompareOutputTarget, usePutImageData } from "src/hooks/useImageData";

const canvasStyle = "block h-[240px] w-[240px] outline outline-1 outline-neutral-300 dark:outline-neutral-700";
//const canvasStyle = "outline- block h-[240px] w-[240px]";

type CanvasProps = {
  className?: string;
};

export function CanvasCode({ className = "" }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useCodeContext();
  usePutImageData(canvasRef, imageData);

  return <canvas ref={canvasRef} className={`${canvasStyle} ${className}`} />;
}

export function CanvasTarget({ className = "" }: CanvasProps) {
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useTargetContext();
  usePutImageData(codeCanvasRef, imageData);

  return <canvas ref={codeCanvasRef} className={`${canvasStyle} ${className}`} />;
}

export function CanvasDebug({ className = "" }: CanvasProps) {
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData } = useCompareOutputTarget();
  usePutImageData(codeCanvasRef, imageData);

  return <canvas ref={codeCanvasRef} className={`${canvasStyle} ${className}`} />;
}
