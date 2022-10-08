import type { NextPage } from "next";
import { CanvasCode } from "src/components/Canvas";
import { Editor } from "src/components/Editor";
import { Head } from "src/components/Head";
import { ThemeToggleButton } from "src/components/ThemeToggleButton";
import { CodeProvider } from "src/contexts/Code";
//import { trpc } from "../utils/trpc";

const Page: NextPage = () => {
  return (
    <CodeProvider>
      <Head
        title="create | svg batle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <ThemeToggleButton />
      <main className="">
        <div>here is the create page</div>
        <div
          className="grid grid-cols-1 place-items-center items-start p-4
          sm:grid-cols-2  
          lg:flex lg:gap-4"
        >
          <div className="sm:order-2 lg:order-3">
            <h2>create</h2>
            <div className="w-[240px]">create button</div>
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
