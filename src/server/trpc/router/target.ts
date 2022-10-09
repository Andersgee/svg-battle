import { t, authedProcedure } from "../trpc";
import { z } from "zod";
import { colorValuesString, tagNamesString } from "src/utils/svgmetaparse";

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
          svgColorValues: colorValuesString(input.svg),
          svgTagNames: tagNamesString(input.svg),
        },
      });
    }),
  submit: authedProcedure
    .input(
      z.object({
        targetId: z.number(),
        sanitizedCode: z.string().min(98),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.targetSubmission.upsert({
        where: {
          targetId_userId: {
            userId: ctx.session.user.id,
            targetId: input.targetId,
          },
        },
        update: {
          sanitizedCode: input.sanitizedCode,
          sanitizedCodeLength: input.sanitizedCode.length,
        },
        create: {
          sanitizedCode: input.sanitizedCode,
          sanitizedCodeLength: input.sanitizedCode.length,
          targetId: input.targetId,
          userId: ctx.session.user.id,
        },
      });
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.target.findMany();
  }),
});
