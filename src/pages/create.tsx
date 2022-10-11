import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { CanvasCode } from "src/components/Canvas";
import { Editor } from "src/components/Editor";
import { Head } from "src/components/Head";
import { Nav } from "src/components/Nav";
import { CodeProvider, useCodeContext } from "src/contexts/Code";
import { useDialogContext } from "src/contexts/Dialog";
import { hashidFromNumber } from "src/utils/hashids";
import { trpc } from "src/utils/trpc";
//import { trpc } from "../utils/trpc";

const Page: NextPage = () => {
  //const targetQuery = trpc.target.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <CodeProvider>
      <Head
        title="create | svg battle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <Nav />
      <main className="">
        <div className="flex justify-center">
          <h1>Create new battle</h1>
        </div>
        <div
          className="grid grid-cols-1 place-items-center items-start p-4
          sm:grid-cols-2  
          lg:flex lg:gap-4"
        >
          <div className="sm:order-2 lg:order-3">
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
  const router = useRouter();
  const inputId = useId();
  const [title, setTitle] = useState("");
  const { sanitizedCode } = useCodeContext();
  const targetMutation = trpc.target.create.useMutation();
  const { setShowSignIn } = useDialogContext();
  const { data: sessionData } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  const onClick = async () => {
    if (!title || !sanitizedCode) return;

    if (sessionData?.user) {
      try {
        const res = await targetMutation.mutateAsync({ title: title, svg: sanitizedCode });
        //revalidate (for the first time) the battle page
        const href = `/b/${hashidFromNumber(res.id)}`;
        router.prefetch(href);
      } catch (error) {
        setShowSignIn(true);
      }
    } else {
      setShowSignIn(true);
      setShowWarning(true);
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
          py-3 text-center font-semibold tracking-wider text-white
          shadow-md transition duration-100 ease-out 
          hover:bg-indigo-500 hover:ease-in focus:bg-indigo-500 
          disabled:bg-neutral-300 disabled:text-neutral-500
          "
        >
          CREATE
        </button>
        {targetMutation.error && (
          <div className="text-red-500">Something went wrong. ({targetMutation.error.message})</div>
        )}
        {showWarning && <div className="text-red-500">Must sign in.</div>}

        {targetMutation.data && (
          <div>
            Created!{" "}
            <Link
              className="underline decoration-dotted hover:text-neutral-500 hover:decoration-solid dark:hover:text-neutral-300"
              href={`/b/${hashidFromNumber(targetMutation.data.id)}`}
            >
              {targetMutation.data.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
