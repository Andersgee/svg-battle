import Link from "next/link";
import { Svgbattle } from "src/icons/Svgbattle";
import { ProfileButton } from "./Signin";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function Nav() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link href="/">
          <Svgbattle />
        </Link>
      </div>
      <div></div>
      <div className="flex">
        <ThemeToggleButton />
        <ProfileButton />
      </div>
    </div>
  );
}
