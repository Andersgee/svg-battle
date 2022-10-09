import { ThemeToggleButton } from "./ThemeToggleButton";

type Props = {
  className?: string;
};

export function Nav({ className }: Props) {
  return (
    <div className="flex justify-end">
      <ThemeToggleButton />
    </div>
  );
}
