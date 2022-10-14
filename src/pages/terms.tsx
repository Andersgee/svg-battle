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
      <main className="flex justify-center p-4">
        <div className="">
          <h1 className="text-4xl font-extrabold leading-normal text-gray-700">terms of service</h1>
          <ul className="list-disc">
            <li>
              <p>
                svg battle is an online code golfing game where players write SVG to visually replicate targets. The
                concept is inspired by css battle
              </p>
            </li>
            <li>
              <p>Dont spam/abuse the service or create offensive content.</p>
            </li>
            <li>
              <p>
                Misuse of the service in any way deemed inappropriate by the creators may result in removal of your
                account.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Page;
