import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Head } from "src/components/Head";
//import { trpc } from "src/utils/trpc";
import { prisma } from "src/server/db/client";
import { numberFromHashid } from "src/utils/hashids";
import { stringFromParam } from "src/utils/param";

type Props = {
  target: Target;
};

const Page: NextPage<Props> = ({ target }) => {
  const router = useRouter();

  if (router.isFallback) {
    //possibly skeleton here
    return <div></div>;
  }

  //const targetQuery = trpc.target.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <>
      <Head
        title="user | svg battle"
        description="Battle others by drawing images with svg."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <main className="">
        <div>target/battle page</div>
        <div>{JSON.stringify(target)}</div>
      </main>
    </>
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

    const props: Props = { target };
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

type Target = NonNullable<inferAsyncReturnType<typeof getTarget>>;

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
    },
  });
}
