// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import PlausibleProvider from "next-plausible";
import { DialogProvider } from "src/contexts/Dialog";
import { CodeProvider } from "src/contexts/Code";
import { TargetProvider } from "src/contexts/Target";
import { Layout } from "src/components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <PlausibleProvider domain="svgbattle.andyfx.net">
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <DialogProvider>
            <CodeProvider>
              <TargetProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </TargetProvider>
            </CodeProvider>
          </DialogProvider>
        </SessionProvider>
      </ThemeProvider>
    </PlausibleProvider>
  );
};

export default trpc.withTRPC(MyApp);
