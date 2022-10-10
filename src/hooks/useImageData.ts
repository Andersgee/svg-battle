import { useEffect, useState } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";

export function useCompareOutputTarget() {
  const { imageData: output } = useCodeContext();
  const { imageData: target } = useTargetContext();
  return useCompareImageData(output, target);
}

/**
 * compare two images. return imagedata describing where they are not equal.
 *
 * also return percentage of equal pixels.
 */
export function useCompareImageData(imageData1?: ImageData, imageData2?: ImageData) {
  const [percent, setPercent] = useState(0);
  const [imageData, setImageData] = useState<ImageData | undefined>(undefined);

  useEffect(() => {
    if (!imageData1 || !imageData2) return;

    const { percentCorrect, debugImageData } = compareImageData(imageData1, imageData2);
    setPercent(percentCorrect);
    setImageData(debugImageData);
  }, [imageData1, imageData2]);

  return { percent, imageData };
}

/**
 * return percentage equal pixels.
 *
 * also return ImageData of where errors are
 */
function compareImageData(imageData: ImageData, targetImageData: ImageData) {
  const Nbytes = imageData.data.length;
  const Npixels = Nbytes / 4;
  const debugData = new Uint8ClampedArray(Nbytes);
  let correctPixelCount = 0;
  for (let i = 0; i < Nbytes; i += 4) {
    const isCorrect = hasSamePixelvalue(i, imageData, targetImageData);
    debugData[i + 3] = 255; // always use full alpha on debug image
    if (isCorrect) {
      correctPixelCount += 1;
    } else {
      /*
      console.log("pixel", i);
      console.log("imageData.data[i], 0,1,2,3", [
        imageData.data[i],
        imageData.data[i + 1],
        imageData.data[i + 2],
        imageData.data[i + 3],
      ]);
      console.log("targetImageData.data[i], 0,1,2,3", [
        targetImageData.data[i],
        targetImageData.data[i + 1],
        targetImageData.data[i + 2],
        targetImageData.data[i + 3],
      ]);
      */

      /*
      debugData[i] = Math.hypot(
        absdiff(imageData.data[i], targetImageData.data[i]),
        absdiff(imageData.data[i + 1], targetImageData.data[i + 1]),
        absdiff(imageData.data[i + 2], targetImageData.data[i] + 2)
      );
      debugData[i] = Math.max(64, debugData[i]);
*/
      debugData[i] = 255; //red
      //debugData[i+1] = 0; //green
      //debugData[i+2] = 0; //blue

      //debugData[i] = 0.5 * imageData.data[i] + 0.5 * targetImageData.data[i];
      //debugData[i + 1] = 0.5 * imageData.data[i + 1] + 0.5 * targetImageData.data[i + 1];
      //debugData[i + 2] = 0.5 * imageData.data[i + 2] + 0.5 * targetImageData.data[i + 2];
    }

    //debugData[i] = diffValue(targetImageData.data[i], imageData.data[i]);
    //debugData[i + 1] = diffValue(targetImageData.data[i + 1], imageData.data[i + 1]);
    //debugData[i + 2] = diffValue(targetImageData.data[i + 2], imageData.data[i + 2]);
  }
  //const percentCorrect = Math.floor(100 * (correctPixelCount / Npixels));
  const fractionCorrect = correctPixelCount / Npixels;
  const percentCorrect = fractionCorrect > 0.999 ? 100 : Math.floor(100 * fractionCorrect);

  //console.log("correctPixelCount", correctPixelCount);
  //console.log("Npixels", Npixels);
  const debugImageData = new ImageData(debugData, imageData.width, imageData.height);
  return {
    percentCorrect,
    debugImageData,
  };
}

const absdiff = (a: number, b: number) => Math.abs(a - b);

/** return 0 if a==b otherwise return largest */
const diffValue = (a: number, b: number) => (a == b ? 0 : a > b ? a : b);

//const diffValue = (a: number, b: number) => Math.abs(b - a);
/**
 * true if indexes i, i+1, i+2, i+3 are the same in `a` and `b`
 * */
function hasSamePixelvalue(i: number, a: ImageData, b: ImageData) {
  return (
    a.data[i] === b.data[i] &&
    a.data[i + 1] === b.data[i + 1] &&
    a.data[i + 2] === b.data[i + 2] &&
    a.data[i + 3] === b.data[i + 3]
  );
}

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

/**
 * Utility for drawing on canvas by ImageData
 *
 * (does nothing if no canvas or no imageData)
 * */
export function usePutImageData(ref: React.RefObject<HTMLCanvasElement>, imageData?: ImageData) {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imageData) {
      return;
    }

    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
  }, [ref, imageData]);
}

function svgObjectUrl(svg: string) {
  return URL.createObjectURL(
    new Blob([svg], {
      type: "image/svg+xml",
    }),
  );
}

/**
 * An image src (for <img src={src}/>) from svg string, without exposing the actual svg string
 *
 * HOW?
 * ```raw
 * 1. make objecturl from an svg string
 * 2. use that as source for an image
 *    2.1 One could stop here but svg string is still visible by going to the img src which is a blob
 * 3. read that image and draw it on canvas
 * 4. make a dataurl of the canvas
 * 5. use that as source for the returned image
 * ```
 */
export function useImageSourceFromSvg(svg: string, width = 240, height = 240) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const url = svgObjectUrl(svg);
    //const img = document.createElement("img");
    //img.width = 240;
    //img.height = 240;
    const img = new Image(width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    img.src = url;
    img.addEventListener(
      "load",
      () => {
        ctx.drawImage(img, 0, 0, width, height);
        console.log("draing image now");
        setSrc(canvas.toDataURL());
      },
      { once: true },
    );

    return () => {
      img.remove();
      canvas.remove();
    };
  }, [svg, width, height]);
  return src;
}
