import { useRef } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useImageDataFromSvg } from "src/hooks/useImageDataFromSvg";
import { usePutImageData } from "src/hooks/usePutImageData";

type Props = {
  className?: string;
};

export function CanvasCode({ className }: Props) {
  const { sanitizedCode } = useCodeContext();
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);

  const imageData = useImageDataFromSvg(sanitizedCode, 96, 96);
  usePutImageData(codeCanvasRef, imageData);

  return <canvas ref={codeCanvasRef} className={className} />;
}
