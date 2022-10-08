import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Head } from "src/components/Head";
//import { trpc } from "src/utils/trpc";
import { prisma } from "src/server/db/client";
import { numberFromHashid } from "src/utils/hashids";
import { stringFromParam } from "src/utils/param";

type Props = {
  user: User;
  hashid: string;
};

const Page: NextPage<Props> = ({ user, hashid }) => {
  const router = useRouter();

  if (router.isFallback) {
    //possibly skeleton here
    return <div></div>;
  }

  //const targetQuery = trpc.target.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <>
      <Head
        title={`${user.name} | profile | svg battle`}
        description={`Svg battle - user profile and battles by ${user.name}.`}
        domainUrl="https://svgbattle.andyfx.net"
        url={`https://svgbattle.andyfx.net/profile/${hashid}`}
      />
      <main className="">
        <div>user/profile page</div>
        <div>{JSON.stringify(user)}</div>
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

    const user = await getUser(id);
    if (!user) return { notFound: true };

    const props: Props = { user, hashid };
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

type User = NonNullable<inferAsyncReturnType<typeof getUser>>;

async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { intId: id },
    include: {
      targetSubmissions: true,
    },
  });
}
