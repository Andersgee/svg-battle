import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Battle } from "src/components/Battle";
import { Head } from "src/components/Head";
import { Nav } from "src/components/Nav";
import { CodeProvider } from "src/contexts/Code";
import { TargetProvider } from "src/contexts/Target";
//import { trpc } from "src/utils/trpc";
import { prisma } from "src/server/db/client";
import { hashidFromNumber, numberFromHashid } from "src/utils/hashids";
import { stringFromParam } from "src/utils/param";

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
    <CodeProvider>
      <TargetProvider>
        <Head
          title={`${target.title} | battle | svg battle`}
          description={`Svg battle - ${target.title} by ${target.creator.name}.`}
          domainUrl="https://svgbattle.andyfx.net"
          url={`https://svgbattle.andyfx.net/b/${hashid}`}
        />
        <Nav />
        <main className="">
          <div className="">
            <h1 className="text-center">
              Battle - {target.title} by{" "}
              <Link href={`/profile/${hashidFromNumber(target.creator.intId)}`}>{target.creator.name}</Link>
            </h1>
          </div>
          <Battle target={target} />
        </main>
      </TargetProvider>
    </CodeProvider>
  );
};

export default Page;

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
          sanitizedCodeLength: true,
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
