import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { documents } from "~/server/db/schema";

export const documentRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.text}`,
      };
    }),


  
  /**
   * Create
   */
  create: publicProcedure
    .input(z.object({ 
      owner: z.number(),
      name: z.string(),
      description: z.string(),
      url: z.string().optional(),
      type: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {

      // Get the token from the headers
      const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      // Decode the token to get the `sub` (userId)
      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;  
      } catch (error: unknown) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      await ctx.db.insert(documents).values({
        owner: input.owner,
        cuid: createId(),
        token: nanoid(6),
        name: input.name,
        description: input.description,
        url: input.url,
        type: input.type,
        createdBy: userId,
        updatedBy: userId,
        
      });
    }),

    /**
     * GetByUser
     */
    getByUser: publicProcedure
        .input(z.object({
        createdBy: z.string().min(1)
        }))

    
    .query(async ({ ctx, input }) => {

      // Get the token from the headers
      const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      // Decode the token to get the `sub` (userId)
      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;  
      } catch (error: unknown) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      const documentsList = await ctx.db.select()
        .from(documents)
        .where(eq(documents.createdBy, input.createdBy))  // Corrected where clause
        .orderBy(documents.createdAt, desc(documents.createdAt))

      return documentsList ?? [];
    }),

    /**
     * getByOwner
     * getByOwner returns a list of documents associated with a specific owner.
     * The function takes an input parameter 'owner' which is the ID of the profile that 'owns' the documents.
     */
    getByOwner: publicProcedure
    .input(z.object({ owner: z.number().min(1).optional() }))
    .query(async ({ ctx, input }) => {
      // Get the token from the headers
      const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;
  
      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }
  
      // Decode the token to get the `sub` (userId)
      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;
  
        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }
  
        userId = decodedToken.sub;  
      } catch (error: unknown) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }
  
      if (!input.owner) {
        throw new Error("Owner is required");
      }
      
      const documentsList = await ctx.db.query.documents.findMany({
        where: input.owner ? eq(documents.owner, input.owner) : undefined,
        columns: {
          id: true,
          cuid: true,
          name: true,
          createdAt: true,
        },
        orderBy: (documents, { desc }) => [desc(documents.createdAt)],
      });
  
      return documentsList ?? null;
    }),

    /**
     * GetByCUID
     */
    getByCUID: publicProcedure
      .input(z.object({
        cuid: z.string().min(1)
      }))

      .query(async ({ ctx, input }) => {

          // Get the token from the headers
          const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

          if (!authToken) {
              throw new Error("Unauthorized: Missing auth token");
          }

          // Decode the token to get the `sub` (userId)
          let userId: string | null = null;
          try {
              const decodedToken = jwt.decode(authToken) as { sub: string } | null;

              if (!decodedToken?.sub) {
                  throw new Error("Unauthorized: Invalid token");
              }

              userId = decodedToken.sub;  
          } catch (error: unknown) {
              throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
          }

          const documentsDetail = await ctx.db.query.documents.findFirst({  // Changed findOne to findFirst
              where: eq(documents.cuid, input.cuid),  // Fixed the syntax for 'where'
              
          });

          return documentsDetail ?? null;  // Changed the return value to null if not found
      }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const documents = await ctx.db.query.documents.findMany({
      orderBy: (documents, { desc }) => [desc(documents.createdAt)],
    });

    return documents ?? null;
    }),

});


