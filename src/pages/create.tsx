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
        <div className="m-4 grid grid-cols-3 gap-4">
          <div className="col-span-2 h-11">
            <Editor />
          </div>
          <div className="col-span-1">
            <CanvasCode />
          </div>
        </div>
      </main>
    </CodeProvider>
  );
};

export default Page;
