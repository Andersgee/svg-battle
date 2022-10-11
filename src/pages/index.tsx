import type { GetStaticProps, NextPage } from "next";
import { Head } from "src/components/Head";
import Link from "next/link";
import { hashidFromNumber } from "src/utils/hashids";
import { Nav } from "src/components/Nav";
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
      <Nav />

      <main className="flex justify-center">
        <div className="">
          <h2>Community created</h2>
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/create" className="relative hover:shadow-lg ">
              <Add
                width={240}
                height={240}
                className="fill-neutral-600 hover:fill-neutral-700 dark:fill-neutral-500 dark:hover:fill-neutral-400 "
              />
              <p className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                create new
              </p>
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
                  <p
                    className="absolute bottom-0 left-0 ml-2 mb-1 max-w-[200px] overflow-hidden text-ellipsis 
                  whitespace-nowrap rounded-sm bg-white px-1 dark:bg-black"
                  >
                    {target.title}
                  </p>
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

type Targets = NonNullable<inferAsyncReturnType<typeof getTargets>>;

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
