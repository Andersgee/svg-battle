import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head } from "src/components/Head";
//import { trpc } from "src/utils/trpc";
import { prisma } from "src/server/db/client";
import { hashidFromNumber, numberFromHashid } from "src/utils/hashids";
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
      <main className="container mx-auto flex min-h-screen justify-center p-4">
        <div>
          <h1>{user.name} profile</h1>

          <h2>created battles</h2>
          <ul className="">
            {user.createdTargets.map((target) => (
              <li key={target.id} className="border-b-2">
                <Link
                  className="decoration-dotted hover:text-neutral-500 hover:decoration-solid"
                  href={`/b/${hashidFromNumber(target.id)}`}
                >
                  {target.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2>completed battles</h2>
          <ul className="">
            {user.targetSubmissions.map((target) => (
              <li key={target.targetId} className="border-b-2">
                <Link
                  className="decoration-dotted hover:text-neutral-500 hover:decoration-solid"
                  href={`/b/${hashidFromNumber(target.targetId)}`}
                >
                  {target.target.title}
                </Link>
                in {target.sanitizedCodeLength} chars
              </li>
            ))}
          </ul>
          {user.targetSubmissions.length === 0 && <p>no battles completed</p>}
        </div>
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
      targetSubmissions: {
        select: {
          sanitizedCodeLength: true,
          targetId: true,
          createdAt: true,
          target: {
            select: {
              title: true,
            },
          },
        },
      },
      createdTargets: {
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
    },
  });
}
