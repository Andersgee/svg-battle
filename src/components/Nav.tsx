import Link from "next/link";
import { ProfileButton } from "./Signin";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function Nav() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link href="/">home</Link>
      </div>
      <div></div>
      <div className="flex">
        <ThemeToggleButton />
        <ProfileButton />
      </div>
    </div>
  );
}
