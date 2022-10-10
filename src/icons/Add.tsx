import { SVGProps } from "react";

type Props = {
  className?: string;
} & SVGProps<SVGSVGElement>;

export function Add({ className, ...rest }: Props) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 24 24" {...rest}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}
