import { useEffect, useId, useRef, useState } from "react";
import Prism from "prismjs";
import { Draghandle } from "src/icons/Draghandle";
import { useCodeContext } from "src/contexts/Code";
//import "prismjs/components/prism-markup";

//const placeholder = "";
const MIN_HEIGHT = 240;

export function Editor() {
  const [mounted, setMounted] = useState(false);
  const { code, setCode } = useCodeContext();
  const codeRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (codeRef.current && mounted) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, mounted]);

  //prismjs is not really built as a text editor, so use a textarea
  //but hide text color on it and show the prismjs highlighted code tag instead
  //this function here is just positioning the code tag on textarea scrolling etc
  const updateCodeSize = () => {
    if (textareaRef.current && codeRef.current) {
      codeRef.current.style.height = `${textareaRef.current.clientHeight + textareaRef.current.scrollTop}px`;
      codeRef.current.style.top = `-${textareaRef.current.scrollTop}px`;
      //codeRef.current.style.backgroundColor = "red";
    }
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (textareaRef.current) {
      const h = Math.max(
        MIN_HEIGHT,
        -window.pageYOffset + e.pageY - textareaRef.current.getBoundingClientRect().top - 20,
      );
      textareaRef.current.style.height = `${h}px`;
      updateCodeSize();
    }
  };

  //custom resize handler
  const onResizeMouseDown = () => {
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener(
      "mouseup",
      () => {
        window.removeEventListener("mousemove", handleResizeMove);
      },
      { once: true },
    );
  };

  return (
    <div className="">
      <label htmlFor={textareaId}>
        <h2>editor</h2>
      </label>
      <pre
        tabIndex={-1}
        className={`${
          mounted ? "language-svg" : ""
        } relative overflow-hidden whitespace-pre-wrap bg-white shadow-md dark:bg-black`}
      >
        {/* type in <textarea> but show the actual highlighted text in <code>*/}
        <textarea
          id={textareaId}
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          spellCheck={false}
          autoComplete="off"
          className={`h-[${MIN_HEIGHT}px] min-h-[${MIN_HEIGHT}px] w-full resize-none bg-transparent text-transparent no-underline caret-black dark:caret-white`}
          onScroll={updateCodeSize}
        />

        <code
          aria-hidden="true"
          ref={codeRef}
          className={`${
            mounted ? "language-svg" : ""
          } pointer-events-none absolute inset-0 select-none overflow-hidden whitespace-pre-wrap bg-transparent`}
        >
          {code}
        </code>
      </pre>

      <div onMouseDown={onResizeMouseDown} className="flex cursor-ns-resize select-none justify-center">
        <Draghandle
          height={24}
          className="w-full fill-neutral-400 hover:fill-neutral-700 dark:fill-neutral-600 dark:hover:fill-neutral-400"
        />
      </div>
    </div>
  );
}
