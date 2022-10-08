import type { NextPage } from "next";
import { Battle } from "src/components/Battle";
import { Head } from "src/components/Head";
import { ThemeToggleButton } from "src/components/ThemeToggleButton";
import { CodeProvider } from "src/contexts/Code";
import { TargetProvider } from "src/contexts/Target";
//import { trpc } from "../utils/trpc";

const Page: NextPage = () => {
  return (
    <CodeProvider>
      <TargetProvider>
        <Head
          title="examplebatte | svg batle"
          description="Battle others by drawing images with svg."
          domainUrl="https://svgbattle.andyfx.net"
          url="https://svgbattle.andyfx.net"
        />
        <ThemeToggleButton />
        <main className="">
          <div>here is the example battle page</div>
          <Battle />
        </main>
      </TargetProvider>
    </CodeProvider>
  );
};

export default Page;
