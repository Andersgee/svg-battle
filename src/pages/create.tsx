import type { NextPage } from "next";
import { useId, useState } from "react";
import { CanvasCode } from "src/components/Canvas";
import { Editor } from "src/components/Editor";
import { Head } from "src/components/Head";
import { ThemeToggleButton } from "src/components/ThemeToggleButton";
import { CodeProvider, useCodeContext } from "src/contexts/Code";
import { trpc } from "src/utils/trpc";
//import { trpc } from "../utils/trpc";

const Page: NextPage = () => {
  const targetQuery = trpc.target.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <CodeProvider>
      <Head
        title="create | svg battle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <ThemeToggleButton />
      <main className="">
        <div>{JSON.stringify(targetQuery.data)}</div>
        <div>here is the create page</div>
        <div
          className="grid grid-cols-1 place-items-center items-start p-4
          sm:grid-cols-2  
          lg:flex lg:gap-4"
        >
          <div className="sm:order-2 lg:order-3">
            <h2>create</h2>
            <div className="w-[240px]">
              <CreateTargetButton />
            </div>
          </div>
          <div className="sm:order-1 lg:order-2">
            <h2>output</h2>
            <CanvasCode />
          </div>

          <div className="w-full sm:order-3 sm:col-span-2 lg:order-1">
            <Editor />
          </div>
        </div>
      </main>
    </CodeProvider>
  );
};

export default Page;

function CreateTargetButton() {
  const inputId = useId();
  const [title, setTitle] = useState("");
  const { sanitizedCode } = useCodeContext();
  const targetMutation = trpc.target.create.useMutation();

  //const vote = trpc.useMutation(["vote.create"]);

  const onClick = () => {
    if (title && sanitizedCode) {
      targetMutation.mutate({ title: title, svg: sanitizedCode });

      //const battleHref = `/b/${hashidFromNumber(res.targetId)}`
      //router.prefetch(battleHref)
    }
  };

  return (
    <div>
      <div className="">
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
          Title
        </label>

        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id={inputId}
          className="block w-full border border-gray-300 
          bg-gray-50 p-2.5 text-sm text-gray-900 
          focus:border-blue-500 focus:ring-blue-500
          dark:border-gray-600 dark:bg-gray-700 dark:text-white 
          dark:placeholder-gray-400 
          dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="My title"
          required
        />
        <button
          disabled={targetMutation.isLoading || title.length < 3 || sanitizedCode.length < 98}
          onClick={onClick}
          className="my-2 rounded-md bg-indigo-600 px-4
          py-3 text-center font-semibold text-white shadow-md
          transition duration-100 ease-out hover:bg-indigo-500 
          hover:ease-in focus:bg-indigo-500 disabled:bg-neutral-300 
          disabled:text-neutral-500
          "
        >
          CREATE
        </button>
      </div>
    </div>
  );
}
