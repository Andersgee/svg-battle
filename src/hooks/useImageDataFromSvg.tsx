import { useEffect, useState } from "react";

/**
 * get ImageData from an svg string
 *
 * (svg is a string starting with the `<svg>` tag)
 */
export function useImageDataFromSvg(svg: string, width: number, height: number) {
  const [imagedata, setImagedata] = useState<ImageData | undefined>(undefined);

  useEffect(() => {
    if (!svg) {
      return;
    }

    const src = URL.createObjectURL(
      new Blob([svg], {
        type: "image/svg+xml",
      }),
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const image = new Image();
    image.addEventListener(
      "load",
      () => {
        ctx.drawImage(image, 0, 0, width, height);
        const data = ctx.getImageData(0, 0, width, height);
        setImagedata(data);
      },
      { once: true },
    );
    image.src = src;

    return () => {
      canvas?.remove();
      image?.remove();
    };
  }, [svg, width, height]);

  return imagedata;
}
