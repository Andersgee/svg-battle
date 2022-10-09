import Link from "next/link";
import { useRef } from "react";
import { useDialogContext } from "src/contexts/Dialog";
import useOnClickOutside from "src/hooks/useOnClickOutside";
import { Person } from "src/icons/Person";
import { SigninDialog } from "./SigninDialog";
import { ThemeToggleButton } from "./ThemeToggleButton";

type Props = {
  className?: string;
};

export function Nav({ className }: Props) {
  const { showSignIn, setShowSignIn } = useDialogContext();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowSignIn(false));

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">home</Link>
        </div>
        <div></div>
        <div className="flex">
          <ThemeToggleButton />
          <div ref={ref}>
            <button onClick={() => setShowSignIn((prev) => !prev)} aria-label="profile">
              <Person className="w-full fill-neutral-400 hover:fill-neutral-700 dark:fill-neutral-600 dark:hover:fill-neutral-400" />
            </button>
            <SigninDialog open={showSignIn} />
          </div>
        </div>
      </div>
    </>
  );
}
