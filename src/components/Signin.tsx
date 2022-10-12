import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useDialogContext } from "src/contexts/Dialog";
import useOnClickOutside from "src/hooks/useOnClickOutside";
import { Discord } from "src/icons/Discord";
import { Github } from "src/icons/Github";
import { Google } from "src/icons/Google";
import { Person } from "src/icons/Person";
import { hashidFromNumber } from "src/utils/hashids";

/**
 * check /api/auth/providers for a list of configured providers
 */
export const providers = {
  discord: { id: "discord", name: "Discord" },
  github: { id: "github", name: "GitHub" },
  google: { id: "google", name: "Google" },
};

type SignInButtonsProps = {
  className?: string;
};

/**
 *
 * Keep same look (light mode) always.
 */
export function SignInButtons({ className }: SignInButtonsProps) {
  const { code } = useCodeContext();

  const onClick = (providerId: string) => () => {
    //keep the users code. re-use it when returning from sign in flow.
    if (code) {
      localStorage.setItem("tempcode", code);
    }
    signIn(providerId);
  };

  return (
    <div className={className}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={onClick(provider.id)}
            className="mb-4 flex w-64 items-center justify-around bg-white p-3 font-medium text-black shadow-md transition duration-100 ease-out hover:bg-neutral-100 hover:ease-in focus:bg-neutral-200"
          >
            <ProviderIcon name={provider.name} className="mr-1 h-7" />
            <span>Sign in with {provider.name}</span>
          </button>
        </div>
      ))}
      <p className="mt-3 w-64 text-center text-sm text-neutral-600 dark:text-neutral-600">
        By signing in, you agree to our <br />
        <Link
          className="text-neutral-600 hover:text-neutral-500 dark:text-neutral-600 dark:hover:text-neutral-500"
          href="/terms"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-neutral-600 hover:text-neutral-500 dark:text-neutral-600 dark:hover:text-neutral-500"
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}

type IconProps = {
  name: string;
  className?: string;
};

export function ProviderIcon({ name, className }: IconProps) {
  if (name === "GitHub") {
    return <Github width={32} height={32} className={className} />;
  } else if (name === "Discord") {
    return <Discord width={38} height={32} className={className} />;
  } else if (name === "Google") {
    return <Google width={32} height={32} className={className} />;
  } else {
    return <div>hm</div>;
  }
}

type SigninDialogProps = {
  open: boolean;
};

export function SigninDialog({ open = false }: SigninDialogProps) {
  if (open) {
    return (
      <div className="absolute top-12 right-0 z-10 border-2 bg-neutral-50 shadow-md ">
        <SignInButtons className="p-4" />
      </div>
    );
  }

  return <></>;
}

type ProfileDialogProps = {
  open: boolean;
  userName?: string | null;
  userIntId: number;
};

function ProfileDialog({ open = false, userName, userIntId }: ProfileDialogProps) {
  if (open) {
    return (
      <div className="absolute top-12 right-0 z-10 border bg-neutral-50 p-4 shadow-md dark:bg-neutral-900">
        <p>
          signed in as <Link href={`/profile/${hashidFromNumber(userIntId)}`}>{userName}</Link>
        </p>
        <div>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </div>
    );
  }

  return <></>;
}

type ProfileButtonProps = {
  className?: string;
};

export function ProfileButton({ className }: ProfileButtonProps) {
  const { showSignIn, setShowSignIn } = useDialogContext();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowSignIn(false));
  const { data: sessionData } = useSession();

  return (
    <div ref={ref} className={className}>
      <button onClick={() => setShowSignIn((prev) => !prev)} aria-label="profile">
        <Person className="w-full fill-neutral-600 hover:fill-neutral-700 dark:fill-neutral-500 dark:hover:fill-neutral-400" />
      </button>
      {sessionData?.user ? (
        <ProfileDialog open={showSignIn} userName={sessionData.user.name} userIntId={sessionData.user.intId} />
      ) : (
        <SigninDialog open={showSignIn} />
      )}
    </div>
  );
}
