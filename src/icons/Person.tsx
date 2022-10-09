import { SVGProps } from "react";

type Props = {
  className?: string;
} & SVGProps<SVGSVGElement>;

export function Person({ className, ...rest }: Props) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 24 24" {...rest}>
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12 m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
