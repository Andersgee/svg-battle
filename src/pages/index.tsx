import type { NextPage } from "next";
import { Head } from "src/components/Head";
import Link from "next/link";
import { hashidFromNumber } from "src/utils/hashids";
import { Nav } from "src/components/Nav";
import { SvgImg } from "src/components/SvgImg";

const hmm = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#FCD34D" height="100%" width="100%" y="0" x="0"></rect><rect fill="#b45309" height="120" width="120" y="0" x="0"></rect></svg>`;

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head
        title="svg batlle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <Nav />

      <main className="container">
        <div>home page here</div>
        <SvgImg svg={hmm} alt="hmm with hidden source" />
        <div>
          <Link href={`/b/${hashidFromNumber(0)}`}>battle 0</Link>
          <Link href={`/b/${hashidFromNumber(1)}`}>battle 1</Link>
        </div>
        <div>
          <Link href={`/profile/${hashidFromNumber(0)}`}>user 0</Link>
          <Link href={`/profile/${hashidFromNumber(1)}`}>user 1</Link>
        </div>
      </main>
    </>
  );
};

export default Home;

/*
function AuthShowcase() {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && <p className="text-2xl text-blue-500">Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p className="text-2xl text-blue-500">{secretMessage}</p>}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-md hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
*/
