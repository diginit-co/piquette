import { eq, and} from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { saves } from "~/server/db/schema";

export const saveRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.text}`,
      };
    }),

  add: publicProcedure
    .input(z.object({ 
      type: z.string().min(1),
      object: z.string(),
      createdBy: z.string(),
      updatedBy: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(saves).values({
        type: input.type,
        object: input.object,
        createdBy: input.createdBy,
        updatedBy: input.updatedBy,
      });
    }),

  delete: publicProcedure
    .input(z.object({ 
      id: z.number(),
      key: z.string(),
      type: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(saves).where(
        and(
          eq(saves.id, input.id),
          eq(saves.cuid, input.key),
          eq(saves.type, input.type),
        )
      );
      console.log( input.id, input.key, input.type)
    }),

  create: publicProcedure
    .input(z.object({ 
      type: z.string().min(1),
      object: z.string(),
      createdBy: z.string(),
      updatedBy: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(saves).values({
        type: input.type,
        object: input.object,
        createdBy: input.createdBy,
        updatedBy: input.updatedBy,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const favorite = await ctx.db.query.saves.findMany({
      orderBy: (saves, { desc }) => [desc(saves.createdAt)],
    });

    return favorite ?? null;
    }),

});
