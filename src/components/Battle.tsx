import { useEffect, useState } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";
import { trpc } from "src/utils/trpc";
import { CanvasCode, CanvasTarget } from "./Canvas";
import { Editor } from "./Editor";
import type { Target } from "src/pages/b/[hashid]";
import { useCompareOutputTarget } from "src/hooks/useImageData";
import { useDialogContext } from "src/contexts/Dialog";
import { useSession } from "next-auth/react";

//<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="120" r="120" fill="#f0c"/><rect x="120" y="120" width="120" height="120" fill="#00c"/></svg>

type Props = {
  className?: string;
  target: Target;
};

export function Battle({ className, target }: Props) {
  const { setCode } = useTargetContext();
  useEffect(() => {
    setCode(target.svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className={className}>
      {/*<CanvasDebug />*/}
      <div
        className="grid grid-cols-1 place-items-center items-start p-4
          sm:grid-cols-2  
          lg:flex lg:gap-4"
      >
        <div className="sm:order-2 lg:order-3">
          <h2>target</h2>
          <CanvasTarget />
        </div>
        <div className="sm:order-1 lg:order-2">
          <CompareInfo />
          <CanvasCode />
        </div>

        <div className="w-full sm:order-3 sm:col-span-2 lg:order-1">
          <Editor />
        </div>
      </div>
      <div className="mx-4 flex gap-8">
        <SubmitCodeButton targetId={target.id} />
        <div>
          <h2 className="text-center text-neutral-600 dark:text-neutral-300">hints</h2>
          <div className="flex gap-4 text-neutral-600 dark:text-neutral-300">
            <div className="">
              <h3 className="text-neutral-600 dark:text-neutral-300">tags</h3>
              <ul>
                {target.svgTagNames.split(" ").map((str) => (
                  <li key={str}>{str}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-neutral-600 dark:text-neutral-300">colors</h3>
              <ul>
                {target.svgColorValues.split(" ").map((str) => (
                  <li key={str}>{str}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SubmitCodeButtonProps = {
  targetId: number;
};

function SubmitCodeButton({ targetId }: SubmitCodeButtonProps) {
  const { sanitizedCode, code } = useCodeContext();
  const { percent } = useCompareOutputTarget();
  const { setShowSignIn } = useDialogContext();
  const targetMutation = trpc.target.submit.useMutation();
  const [codeLength, setCodeLength] = useState(0);
  const { data: sessionData } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setCodeLength(code.replaceAll("\n", "").length);
  }, [code]);

  const onClick = async () => {
    if (sanitizedCode) {
      try {
        if (sessionData?.user) {
          await targetMutation.mutateAsync({
            targetId,
            sanitizedCode,
            codeLength,
          });
        } else {
          setShowSignIn(true);
          setShowWarning(true);
        }
      } catch (error) {
        setShowSignIn(true);
      }
    }
  };

  return (
    <div className="">
      <button
        disabled={targetMutation.isLoading || percent < 100}
        onClick={onClick}
        className="my-2 rounded-md bg-indigo-600 px-4
          py-3 text-center font-semibold tracking-wider text-white
          shadow-md transition duration-100 ease-out 
          hover:bg-indigo-500 hover:ease-in focus:bg-indigo-500 
          disabled:bg-neutral-300 disabled:text-neutral-500
          "
      >
        SUBMIT
      </button>
      {targetMutation.data && (
        <>
          <div className="text-green-500">Submitted!</div>
          <div className="text-green-500">Your score: {codeLength} chars (newlines auto removed)</div>
        </>
      )}
      {(targetMutation.error || showWarning) && <div className="text-red-500">Must be signed in</div>}
    </div>
  );
}

type CompareInfoProps = {
  className?: string;
};

export function CompareInfo({ className }: CompareInfoProps) {
  const { percent } = useCompareOutputTarget();
  return <h2 className={className}>output ({percent}% correct)</h2>;
}
