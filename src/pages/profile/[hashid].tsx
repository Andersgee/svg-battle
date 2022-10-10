import { inferAsyncReturnType } from "@trpc/server";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head } from "src/components/Head";
import { Nav } from "src/components/Nav";
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
      <Nav />
      <main className="container mx-auto flex min-h-screen justify-center p-4">
        <div>
          <div className="flex align-baseline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image!}
              alt={user.name!}
              className="mr-2 h-12 w-12 rounded-full shadow-imageborder  shadow-black dark:shadow-white"
            />
            <h1 className="text-4xl">{user.name}</h1>
          </div>

          <h2>created battles</h2>
          <ul className="">
            {user.createdTargets.map((target) => (
              <li key={target.id} className="border-b-2">
                <Link href={`/b/${hashidFromNumber(target.id)}`}>{target.title}</Link>
              </li>
            ))}
          </ul>

          <h2>completed battles</h2>
          <table className="">
            <tbody>
              {user.targetSubmissions.map((submission) => (
                <tr key={submission.targetId} className="border-b-2">
                  <td>
                    <Link href={`/b/${hashidFromNumber(submission.targetId)}`}>{submission.target.title}</Link>
                  </td>
                  <td>({submission.score} points)</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          codeLength: true,
          targetId: true,
          score: true,
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
