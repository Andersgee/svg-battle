import type { GetStaticProps, NextPage } from "next";
import { Head } from "src/components/Head";
import Link from "next/link";
import { hashidFromNumber } from "src/utils/hashids";
import { SvgImg } from "src/components/SvgImg";
import { prisma } from "src/server/db/client";
import { inferAsyncReturnType } from "@trpc/server";
import { Add } from "src/icons/Add";

type Props = {
  targets: Targets;
};

const Page: NextPage<Props> = ({ targets }) => {
  return (
    <>
      <Head
        title="svg batlle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />

      <main className="flex justify-center">
        <div className="mx-2">
          <h2 className="mt-8 text-2xl">Basic Shapes</h2>
          <p className=" mb-2">
            Learn the basic shapes of svg in these battles. An introduction to the basic shapes is available{" "}
            <Link href="https://www.w3.org/TR/SVG2/shapes.html"> here</Link>.
          </p>
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {basicshapes.map((target) => {
              return (
                <Link key={target.id} href={`/b/${hashidFromNumber(target.id)}`} className="relative hover:shadow-lg">
                  <SvgImg
                    svg={target.svg}
                    alt={target.title}
                    width={240}
                    height={240}
                    className="h-[240px] w-[240px] outline outline-1 outline-neutral-300 
                    dark:outline-neutral-700"
                  />
                  <div
                    className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis 
                  whitespace-nowrap rounded-sm bg-white px-1 dark:bg-black"
                  >
                    {target.title}
                  </div>
                </Link>
              );
            })}
          </div>

          <h2 className="mt-8 text-2xl">Path Shapes</h2>
          <p className=" mb-2">
            The path element can draw anything the basic shapes can and more! An introduction to the path element is
            available <Link href="https://www.w3.org/TR/SVG2/paths.html"> here</Link>.
          </p>
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pathshapes.map((target) => {
              return (
                <Link key={target.id} href={`/b/${hashidFromNumber(target.id)}`} className="relative hover:shadow-lg">
                  <SvgImg
                    svg={target.svg}
                    alt={target.title}
                    width={240}
                    height={240}
                    className="h-[240px] w-[240px] outline outline-1 outline-neutral-300 
                    dark:outline-neutral-700"
                  />
                  <div
                    className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis 
                  whitespace-nowrap rounded-sm bg-white px-1 dark:bg-black"
                  >
                    {target.title}
                  </div>
                </Link>
              );
            })}
          </div>

          <h2 className="mt-8 text-2xl">Paint Servers</h2>
          <p className=" mb-2">
            Fill or stroke can be defined by resources found elsewhere, in particular in the def tag. An introduction is
            available <Link href="https://www.w3.org/TR/SVG2/pservers.html"> here</Link>.
          </p>
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {intermediateshapes.map((target) => {
              return (
                <Link key={target.id} href={`/b/${hashidFromNumber(target.id)}`} className="relative hover:shadow-lg">
                  <SvgImg
                    svg={target.svg}
                    alt={target.title}
                    width={240}
                    height={240}
                    className="h-[240px] w-[240px] outline outline-1 outline-neutral-300 
                    dark:outline-neutral-700"
                  />
                  <div
                    className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis 
                  whitespace-nowrap rounded-sm bg-white px-1 dark:bg-black"
                  >
                    {target.title}
                  </div>
                </Link>
              );
            })}
          </div>

          <h2 className="mt-8 text-2xl">Latest battles</h2>
          <p className="mb-2"></p>
          <p className=" mb-2">
            The latest battles created by the community. You can create a new battle <Link href="/create">here</Link>.
          </p>

          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/create" className="relative hover:shadow-lg ">
              <Add
                width={240}
                height={240}
                className="fill-neutral-600 hover:fill-neutral-700 dark:fill-neutral-500 dark:hover:fill-neutral-400 "
              />
              <div className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                create new
              </div>
            </Link>

            {targets.map((target) => {
              return (
                <Link key={target.id} href={`/b/${hashidFromNumber(target.id)}`} className="relative hover:shadow-lg">
                  <SvgImg
                    svg={target.svg}
                    alt={target.title}
                    width={240}
                    height={240}
                    className="h-[240px] w-[240px] outline outline-1 outline-neutral-300 
                    dark:outline-neutral-700"
                  />
                  <div
                    className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis 
                  whitespace-nowrap rounded-sm bg-white px-1 dark:bg-black"
                  >
                    {target.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;

//////////////////////////
// props

export const getStaticProps: GetStaticProps = async () => {
  try {
    const targets = await getTargets();

    const props: Props = { targets };
    return {
      props,
      revalidate: 10, //at most once every 10 seconds
    };
  } catch (error) {
    throw new Error("something went wrong");
    //return { notFound: true };
  }
};

//////////////////////////
// utils

export type Targets = NonNullable<inferAsyncReturnType<typeof getTargets>>;

async function getTargets() {
  return prisma.target.findMany({
    select: {
      id: true,
      title: true,
      svg: true,
    },
    take: 12,
    orderBy: {
      createdAt: "desc",
    },
  });
}

type HardcodedTargets = { title: string; id: number; svg: string }[];

//Always list these introduction battles. The ids must correspond to the real ids.

export const basicshapes: HardcodedTargets = [
  {
    title: "rect",
    id: 7,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#38bdf8" height="100%" width="100%"></rect><rect fill="#0284c7" height="120" width="120" y="120" x="120"></rect></svg>`,
  },
  {
    title: "circle",
    id: 8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#f0abfc" height="100%" width="100%"></rect><circle fill="#c026d3" r="80" cy="120" cx="120"></circle></svg>`,
  },
  {
    title: "ellipse",
    id: 9,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#86efac" height="100%" width="100%"></rect><ellipse fill="#16a34a" ry="50" rx="100" cy="120" cx="120"></ellipse></svg>`,
  },
  {
    title: "line",
    id: 13,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#fcd34d" height="100%" width="100%"></rect><line stroke="#d97706" stroke-width="20" y2="180" x2="180" y1="60" x1="60"></line></svg>`,
  },
  {
    title: "polyline",
    id: 11,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#fdba74" height="100%" width="100%"></rect><polyline points="30,120,90,180,150,60,210,120" stroke-width="20" stroke="#ea580c" fill="none"></polyline></svg>`,
  },
  {
    title: "polygon",
    id: 12,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#cbd5e1" height="100%" width="100%"></rect><polygon points="30,120,90,180,150,60,210,120" fill="#475569"></polygon></svg>`,
  },
];

export const pathshapes: HardcodedTargets = [
  {
    title: "quadratic bézier",
    id: 16,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect fill="#c4b5fd" height="100%" width="100%"></rect><path fill="none" stroke="#7c3aed" stroke-width="20" d="M 60 120 q 30 -120 60 0 t 60 0"></path></svg>`,
  },
  {
    title: "cubic bézier",
    id: 15,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect width="100%" height="100%" fill="#5eead4"></rect><path d="M 60 120 c 0 -120 60,-120 60 0 s 60 120 60 0" stroke-width="20" stroke="#0d9488" fill="none"></path></svg>`,
  },
  {
    title: "elliptical arc",
    id: 17,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><rect width="100%" height="100%" fill="#fda4af"></rect><path d="M 60 120 a 30 60 0 1 1 60 0 a 30 60 0 1 0 60 0" stroke-width="20" stroke="#e11d48" fill="none"></path></svg>`,
  },
];

export const intermediateshapes: HardcodedTargets = [
  {
    title: "linearGradient",
    id: 21,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><defs><linearGradient id="MyGradient"><stop offset="0%" stop-color="#34d399"></stop><stop offset="100%" stop-color="#facc15"></stop></linearGradient></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#MyGradient)"></rect></svg>`,
  },
  {
    title: "radialGradient",
    id: 22,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><defs>    <radialGradient r="100" cy="120" cx="120" gradientUnits="userSpaceOnUse" id="MyGradient">      <stop stop-color="#dbeafe" offset="0%"></stop>      <stop stop-color="#6366f1" offset="50%"></stop>      <stop stop-color="#dbeafe" offset="100%"></stop>    </radialGradient>  </defs>  <rect height="100%" width="100%" y="0" x="0" fill="url(#MyGradient)"></rect></svg>`,
  },
  {
    title: "pattern",
    id: 23,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" height="240px" width="240px"><defs><pattern height="16" width="16" patternUnits="userSpaceOnUse" id="MyPattern"><rect fill="#65a30d" height="12" width="12"></rect></pattern> </defs><rect fill="#bef264" height="100%" width="100%"></rect><circle r="90" cy="120" cx="120" fill="url(#MyPattern)"></circle></svg>`,
  },
];
