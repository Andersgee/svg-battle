import { router, procedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  hello: procedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? "world"}`,
    };
  }),
  getAll: procedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
