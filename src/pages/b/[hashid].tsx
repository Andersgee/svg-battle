import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Battle } from "src/components/Battle";
import { Head } from "src/components/Head";
//import { trpc } from "src/utils/trpc";
import { prisma } from "src/server/db/client";
import { hashidFromNumber, numberFromHashid } from "src/utils/hashids";
import { stringFromParam } from "src/utils/param";
import ReactMarkdown from "react-markdown";

type Props = {
  target: Target;
  hashid: string;
};

const Page: NextPage<Props> = ({ target, hashid }) => {
  const router = useRouter();

  if (router.isFallback) {
    //possibly skeleton here
    return <div></div>;
  }

  //const targetQuery = trpc.target.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <>
      <Head
        title={`${target.title} | svg battle`}
        description={`svgbattle - ${target.title} by ${target.creator.name}.`}
        domainUrl="https://svgbattle.andyfx.net"
        url={`https://svgbattle.andyfx.net/b/${hashid}`}
        imageUrl={`https://svgbattle.andyfx.net/api/svgog?title=${encodeURIComponent(
          `${target.title} by ${target.creator.name} | svgbattle`,
        )}&svg=${encodeURIComponent(target.svg)}`}
      />
      <main className="">
        <div className="flex justify-center">
          <div>
            {target.description ? (
              <>
                <h1 className="text-center capitalize">{target.title}</h1>
                <ReactMarkdown className="">{target.description}</ReactMarkdown>
              </>
            ) : (
              <h1 className="text-center">
                {target.title} by{" "}
                <Link href={`/profile/${hashidFromNumber(target.creator.intId)}`}>{target.creator.name}</Link>
              </h1>
            )}
            <div className="flex justify-center gap-4">
              <div>
                <pre>tags: {target.svgTagNames}</pre>
                <pre className="flex">
                  <div>colors: </div>
                  {target.svgColorValues.split(" ").map((c) => (
                    <div key={c} className="mr-2 flex">
                      <Dot fill={c} /> <span>{c}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <Battle target={target} />
      </main>
    </>
  );
};

export default Page;

type ColorDot = {
  fill: string;
};

function Dot({ fill }: ColorDot) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
      <circle cx="8" cy="10" r="6" fill={fill} />
    </svg>
  );
}

//////////////////////////
// props

export const getStaticPaths: GetStaticPaths = async () => {
  //return { paths: generatePagePaths(), fallback: false };
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const hashid = stringFromParam(params?.hashid);
    if (!hashid) return { notFound: true };

    const id = numberFromHashid(hashid);
    if (!id) return { notFound: true };

    const target = await getTarget(id);
    if (!target) return { notFound: true };

    const props: Props = { target, hashid };
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

export type Target = NonNullable<inferAsyncReturnType<typeof getTarget>>;

async function getTarget(id: number) {
  return prisma.target.findUnique({
    where: { id },
    include: {
      submissions: {
        select: {
          userId: true,
          codeLength: true,
        },
        orderBy: {
          codeLength: "asc",
        },
      },
      creator: {
        select: {
          name: true,
          intId: true,
        },
      },
    },
  });
}
