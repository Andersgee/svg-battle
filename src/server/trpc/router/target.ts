import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const targetRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        svg: z.string().min(98),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.target.create({
        data: {
          creatorId: ctx.session.user.id,
          title: input.title,
          svg: input.svg,
        },
      });
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.target.findMany();
  }),
});
