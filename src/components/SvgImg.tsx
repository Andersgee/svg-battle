import { ImgHTMLAttributes } from "react";
import { useImageSourceFromSvg } from "src/hooks/useImageData";

type Props = {
  svg: string;
  alt: string;
  className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

/**
 * An <img> from svg string, without exposing the actual svg string.
 */
export function SvgImg({ svg, alt, className, ...rest }: Props) {
  const src = useImageSourceFromSvg(svg);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={240} height={240} className={className} {...rest} />;
}
