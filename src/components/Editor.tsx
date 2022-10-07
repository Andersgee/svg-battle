import { useEffect, useId, useRef, useState } from "react";
import Prism from "prismjs";
import { Draghandle } from "src/icons/Draghandle";
import { useCodeContext } from "src/contexts/Code";
//import "prismjs/components/prism-markup";

const placeholder = `<svg width="100px" height="100px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<rect x="24" y="24" width="10" height="10" fill="#00c"/>
<circle cx="24" cy="24" r="10" fill="#00c"/>
</svg>
`;

//const placeholder = "";
const MIN_HEIGHT = 300;

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
      <label htmlFor={textareaId}>code editor</label>
      <pre
        tabIndex={-1}
        className={`${
          mounted ? "language-svg" : ""
        } relative overflow-hidden whitespace-pre-wrap bg-white shadow-md dark:bg-black`}
      >
        {/* type in <textarea> but show the actual (highlighted) text in <code>*/}
        <textarea
          id={textareaId}
          ref={textareaRef}
          spellCheck={false}
          autoComplete="off"
          className={`min-h-[300px] w-full resize-none bg-transparent text-transparent no-underline caret-black dark:caret-white`}
          onChange={(e) => {
            setCode(e.target.value);
          }}
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
        <Draghandle className="fill-neutral-400  hover:fill-neutral-700 dark:fill-neutral-600 dark:hover:fill-neutral-400" />
      </div>
    </div>
  );
}

/*
const Textarea = styled.textarea`
  ${style}
  background-color: transparent;
  background-color: ${(props) => props.theme.color.paper};
  color: transparent;
  caret-color: ${(props) => props.theme.color.text.primary};

  resize: none; //use custom resizing instead

  height: 300px;

  &:focus {
    outline: 1px solid ${(props) => props.theme.color.accent};
    outline-offset: -1px;
  }
`;

const StyledCode = styled.code`
  ${style}

  pointer-events: none;
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
`;

*/
