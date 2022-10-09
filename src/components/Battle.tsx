import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";
import { useCodeContext } from "src/contexts/Code";
import { useTargetContext } from "src/contexts/Target";
import { hashidFromNumber } from "src/utils/hashids";
import { trpc } from "src/utils/trpc";
import { CanvasCode, CanvasDebug, CanvasTarget } from "./Canvas";
import { CompareInfo } from "./CompareInfo";
import { Editor } from "./Editor";

import type { Target } from "src/pages/b/[hashid]";
const a = `<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"></svg>`;
const placeholderTarget = `<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="120" cy="120" r="120" fill="#00c"/>
<rect x="120" y="120" width="120" height="120" fill="#00c"/>
</svg>
`;

//<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="120" r="120" fill="#f0c"/><rect x="120" y="120" width="120" height="120" fill="#00c"/></svg>

type Props = {
  className?: string;
  target: Target;
};

export function Battle({ className, target }: Props) {
  const { setCode } = useTargetContext();
  useEffect(() => {
    setCode(target.svg);
  }, [target]);

  return (
    <div className={className}>
      <CanvasDebug />
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
      <div className="flex justify-around">
        <SubmitCodeButton targetId={target.id} />
        <div>
          <h2>hints</h2>
          <div>
            <h3>colors:</h3>
            <div>{target.svgColorValues}</div>
          </div>
          <div>
            <h3>{`<tags>:`}</h3>
            <div>{target.svgTagNames}</div>
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
  const inputId = useId();
  const { sanitizedCode } = useCodeContext();
  const targetMutation = trpc.target.submit.useMutation();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  //const vote = trpc.useMutation(["vote.create"]);

  const onClick = async () => {
    setSaved(false);
    setError(false);
    if (sanitizedCode) {
      try {
        await targetMutation.mutateAsync({ targetId, sanitizedCode });
        setSaved(true);
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <div>
      <div className="">
        <button
          disabled={targetMutation.isLoading || sanitizedCode.length < 98}
          onClick={onClick}
          className="my-2 rounded-md bg-indigo-600 px-4
          py-3 text-center font-semibold text-white shadow-md
          transition duration-100 ease-out hover:bg-indigo-500 
          hover:ease-in focus:bg-indigo-500 disabled:bg-neutral-300 
          disabled:text-neutral-500
          "
        >
          SUBMIT
        </button>
        {saved && <div className="text-green-500">SAVED</div>}
        {error && <div className="text-red-500">COULD NOT SUBMIT</div>}
      </div>
    </div>
  );
}
