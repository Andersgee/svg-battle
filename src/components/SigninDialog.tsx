import { SignInButtons } from "./SignInButtons";

type Props = {
  className?: string;
  open: boolean;
};

export function SigninDialog({ open = false, className }: Props) {
  if (open) {
    return (
      <div className="absolute top-12 right-0 bg-neutral-50">
        <SignInButtons />
      </div>
    );
  }

  return <></>;
}
