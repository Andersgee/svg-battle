import { ImgHTMLAttributes } from "react";
import { useImageSourceFromSvg } from "src/hooks/useImageData";

type Props = {
  svg: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

/**
 * An <img> from svg string, without exposing the actual svg string.
 */
export function SvgImg({ svg, alt, width, height, className, ...rest }: Props) {
  const src = useImageSourceFromSvg(svg, width, height);

  if (!src) {
    return <div className={className}></div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />;
}
