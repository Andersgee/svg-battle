// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { targetRouter } from "./target";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  target: targetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
