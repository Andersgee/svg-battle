import { SVGProps } from "react";

type Props = {
  className?: string;
} & SVGProps<SVGSVGElement>;
/*
export function Svgbattle({ className, ...rest }: Props) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 240 240" {...rest}>
      <circle fill="#f5f3ff" r="110" cy="120" cx="120" />
      <path
        stroke-width="40"
        stroke="#0284c7"
        fill="none"
        stroke-linecap="butt"
        clip-path="path('M 0 20 L 240 200 v -220')"
        d="M 180 60 
c -120 -20 -120 40 -60 60 
s 60 90 -66 50"
      />
      <path
        stroke-width="40"
        stroke="#0c4a6e"
        fill="none"
        stroke-linecap="butt"
        clip-path="path('M 0 40 L 240 220 v 20 h -240')"
        d="M 180 60 
c -120 -20 -120 40 -60 60 
s 60 90 -66 50"
      />

      <path
        stroke-width="40"
        stroke="#f97316"
        fill="none"
        stroke-linecap="butt"
        clip-path="path('M 0 20 L 240 200 v 20 L 0 40')"
        d="M 180 60 
c -120 -20 -120 40 -60 60 
s 60 90 -66 50"
      />
    </svg>
  );
}
*/
export function Svgbattle({ className, ...rest }: Props) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 240 240" {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px">
        <circle
          className="dark:fill-black dark:stroke-white"
          cx="120"
          cy="120"
          r="110"
          fill="#fff"
          stroke="black"
          stroke-width="2"
        ></circle>
        <path
          className="stroke-sky-400 dark:stroke-sky-200"
          d="M 180 60 c -120 -20 -120 40 -60 60 s 60 90 -66 50"
          clip-path="path('M 0 40 L 240 200 v -240')"
          stroke-linecap="butt"
          fill="none"
          stroke="#0284c7"
          stroke-width="40"
        ></path>
        <path
          className="stroke-sky-700 dark:stroke-sky-500"
          d="M 180 60 c -120 -20 -120 40 -60 60 s 60 90 -66 50"
          clip-path="path('M 0 40 L 240 200 h -240')"
          stroke-linecap="butt"
          fill="none"
          stroke="#0c4a6e"
          stroke-width="40"
        ></path>
      </svg>
    </svg>
  );
}
