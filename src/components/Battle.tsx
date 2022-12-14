import { useEffect, useState } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";
import { trpc } from "src/utils/trpc";
import { CanvasCode, CanvasTarget, CanvasDebug } from "./Canvas";
import { Editor } from "./Editor";
import type { Target } from "src/pages/b/[hashid]";
import { useCompareOutputTarget } from "src/hooks/useImageData";
import { useDialogContext } from "src/contexts/Dialog";
import { useSession } from "next-auth/react";
import { hashidFromNumber } from "src/utils/hashids";
import { revalidate } from "src/utils/revalidate";
import useEventListener from "src/hooks/useEventListener";

type Props = {
  className?: string;
  target: Target;
  description?: string;
};

export function Battle({ className, target, description }: Props) {
  const { setCode: setTargetCode } = useTargetContext();
  const { setCode } = useCodeContext();
  const { data: sessionData } = useSession();
  const { data: submissionData } = trpc.target.getSubmission.useQuery(
    { targetId: target.id },
    { refetchOnWindowFocus: false, retry: false, enabled: !!sessionData?.user },
  );

  useEffect(() => {
    setTargetCode(target.svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => {
    if (submissionData) {
      setCode(submissionData.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionData]);

  useEffect(() => {
    if (sessionData?.user) {
      const tempcode = localStorage.getItem("tempcode");
      if (tempcode) {
        setCode(tempcode);
        localStorage.removeItem("tempcode");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData?.user]);

  return (
    <div className={className}>
      {description && <p className="text-center">{description}</p>}
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
          <div className="group h-[240px] w-[240px]">
            <CanvasCode className="absolute block group-hover:hidden" />
            <CanvasDebug className="absolute hidden group-hover:block" />
          </div>
        </div>

        <div className="w-full sm:order-3 sm:col-span-2 lg:order-1">
          <Editor />
        </div>
      </div>
      <div className="mx-4 flex justify-center gap-8">
        <SubmitCodeButton targetId={target.id} />
      </div>
    </div>
  );
}

type SubmitCodeButtonProps = {
  targetId: number;
};

function SubmitCodeButton({ targetId }: SubmitCodeButtonProps) {
  const { code } = useCodeContext();
  const { percent } = useCompareOutputTarget();
  const { setShowSignIn } = useDialogContext();
  const targetMutation = trpc.target.submit.useMutation();
  const { data: sessionData } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  useEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyS") {
      e.preventDefault();
      if (!targetMutation.isLoading) {
        onClick();
      }
    }
  });

  const onClick = async () => {
    if (sessionData?.user) {
      try {
        await targetMutation.mutateAsync({
          targetId,
          code,
          percent,
        });
        //revalidate profile
        const href = `/profile/${hashidFromNumber(sessionData.user.intId)}`;
        revalidate(href);
      } catch (error) {
        setShowSignIn(true);
      }
    } else {
      setShowSignIn(true);
      setShowWarning(true);
      //tried submitting without being signed in
      //if the person goes to sign in (and returns to this page automatically) the code will be lost
      //idea:
      //1. save it temporarily in localstorage
      //2. on page load, check if
      //     if (signedin && code==="" && localstorage has code
      //     then paste localstorage code and clear localstorage
    }
  };

  return (
    <div className="">
      <button
        disabled={targetMutation.isLoading}
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
      {targetMutation.data && <div className="text-green-500">Submitted! score: {targetMutation.data.score}</div>}
      {targetMutation.error && (
        <div className="text-red-500">Something went wrong. ({targetMutation.error.message})</div>
      )}
      {showWarning && <div className="text-red-500">Must sign in.</div>}
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
