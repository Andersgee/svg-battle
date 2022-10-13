import type { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <div className="flex w-full justify-center ">
      <div className="mt-10">
        <h1 className="mb-4 text-4xl">Page Not Found</h1>
        <Link href="/">go back to home page</Link>
      </div>
    </div>
  );
};

export default Page;
