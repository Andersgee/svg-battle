import { useEffect } from "react";
import { useTargetContext } from "src/contexts/Target";
import { CanvasCode, CanvasDebug, CanvasTarget } from "./Canvas";
import { CompareInfo } from "./CompareInfo";
import { Editor } from "./Editor";

const a = `<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"></svg>`;
const placeholderTarget = `<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
<circle cx="120" cy="120" r="120" fill="#00c"/>
<rect x="120" y="120" width="120" height="120" fill="#00c"/>
</svg>
`;

//<svg width="240px" height="240px" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="120" r="120" fill="#f0c"/><rect x="120" y="120" width="120" height="120" fill="#00c"/></svg>

type Props = {
  className?: string;
};

export function Battle({ className }: Props) {
  const { setCode } = useTargetContext();
  useEffect(() => {
    setCode(placeholderTarget);
  }, []);

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
    </div>
  );
}
