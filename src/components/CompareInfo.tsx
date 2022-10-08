import { useCompareOutputTarget } from "src/hooks/useImageData";

type Props = {
  className?: string;
};

export function CompareInfo({ className }: Props) {
  const { percent } = useCompareOutputTarget();
  return <h2 className={className}>output ({percent}% correct)</h2>;
}
