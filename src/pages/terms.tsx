import type { NextPage } from "next";
import { Head } from "src/components/Head";

const Page: NextPage = () => {
  return (
    <>
      <Head
        title="terms | svg battle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">privacy policy</h1>
        <p>todo</p>
      </main>
    </>
  );
};

export default Page;
