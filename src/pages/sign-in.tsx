import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head } from "src/components/Head";
import { ProviderIcon, providers } from "src/components/Signin";

/*
The following errors are passed as error query parameters to the default or overridden sign-in page:

    OAuthSignin: Error in constructing an authorization URL (1, 2, 3),
    OAuthCallback: Error in handling the response (1, 2, 3) from an OAuth provider.
    OAuthCreateAccount: Could not create OAuth provider user in the database.
    EmailCreateAccount: Could not create email provider user in the database.
    Callback: Error in the OAuth callback handler route
    OAuthAccountNotLinked: If the email on the account is already linked, but not with this OAuth account
    EmailSignin: Sending the e-mail with the verification token failed
    CredentialsSignin: The authorize callback returned null in the Credentials provider. We don't recommend providing information about which part of the credentials were wrong, as it might be abused by malicious hackers.
    SessionRequired: The content of this page requires you to be signed in at all times. See useSession for configuration.
    Default: Catch all, will apply, if none of the above matched

Example: /auth/signin?error=Default

*/

const Page: NextPage = () => {
  const router = useRouter();
  const error = router.query.error;

  return (
    <>
      <Head
        title="svg battle"
        description="sign in to svg battle."
        domainUrl="https://svgbattle.andyfx.net"
        url="https://svgbattle.andyfx.net"
      />
      <main className="flex h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-800">
        <div>
          <h1 className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">Sign in</h1>
          <p className="mb-8 text-center">to Svg Battle</p>

          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="m-2 flex w-64 items-center justify-around bg-white p-3 font-medium text-black shadow-md transition duration-100 ease-out hover:bg-neutral-100 hover:ease-in focus:bg-neutral-200"
              >
                <ProviderIcon name={provider.name} className="mr-2 h-7" />
                <span>Sign in with {provider.name}</span>
              </button>
            </div>
          ))}

          <p className="mt-3 w-64 text-center text-sm">
            By signing in, you agree to our <br />
            <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
          </p>
          {error && <p className="text-red-600">something went wrong</p>}
          {error && <p className="text-red-600">error: {JSON.stringify(error)}</p>}
        </div>
      </main>
    </>
  );
};

export default Page;
