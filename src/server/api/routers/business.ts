import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { businesses } from "~/server/db/schema";

export const businessRouter = createTRPCRouter({
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
      name: z.string(),
      description: z.string(),
      location: z.string(),
      url: z.string(),
      industry: z.string(),
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

      await ctx.db.insert(businesses).values({
        cuid: createId(),
        token: nanoid(6),
        name: input.name,
        description: input.description,
        location: input.location,
        url: input.url,
        industry: input.industry,
        createdBy: userId,
        updatedBy: userId,
        owner: userId
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

      const businessesList = await ctx.db.select()
        .from(businesses)
        .where(eq(businesses.createdBy, input.createdBy))  // Corrected where clause
        .orderBy(businesses.createdAt, desc(businesses.createdAt))

      return businessesList ?? [];
    }),

    /**
     * GetByOwner
     */
    getByOwner: publicProcedure
        .input(z.object({
        owner: z.string().min(1)
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

    const businessesList = await ctx.db.select()
        .from(businesses)
        .where(eq(businesses.createdBy, input.owner))  // Corrected where clause
        .orderBy(businesses.createdAt, desc(businesses.createdAt))

    return businessesList ?? [];
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

          const businessesDetail = await ctx.db.query.businesses.findFirst({  // Changed findOne to findFirst
              where: eq(businesses.cuid, input.cuid),  // Fixed the syntax for 'where'
              
          });

          return businessesDetail ?? null;  // Changed the return value to null if not found
      }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const businesses = await ctx.db.query.businesses.findMany({
      orderBy: (businesses, { desc }) => [desc(businesses.createdAt)],
    });

    return businesses ?? null;
    }),

});


