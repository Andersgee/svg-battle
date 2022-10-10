import { t, authedProcedure } from "../trpc";
import { z } from "zod";
import { colorValuesString, tagNamesString } from "src/utils/svgmetaparse";
import { calcScore } from "src/utils/score";

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
  getSubmission: authedProcedure
    .input(
      z.object({
        targetId: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.targetSubmission.findUnique({
        where: {
          targetId_userId: {
            targetId: input.targetId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),
  submit: authedProcedure
    .input(
      z.object({
        targetId: z.number(),
        code: z.string(),
        percent: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const codeLength = input.code.replaceAll("\n", "").length;
      const score = calcScore(input.percent, codeLength);
      return ctx.prisma.targetSubmission.upsert({
        where: {
          targetId_userId: {
            userId: ctx.session.user.id,
            targetId: input.targetId,
          },
        },
        update: {
          code: input.code,
          codeLength,
          score,
        },
        create: {
          userId: ctx.session.user.id,
          targetId: input.targetId,
          code: input.code,
          codeLength,
          score,
        },
      });
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.target.findMany();
  }),
});
