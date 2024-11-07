import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { profiles } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

export const profileRouter = createTRPCRouter({
  // Create Profile
  create: publicProcedure
    .input(z.object({ user: z.string() }))
    .mutation(async ({ ctx, input }) => {
    //   const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

    const authToken = "user_2feGexcPqJqxlGcSW5CXhZB5t6g"
    //   if (!authToken) {
    //     throw new Error("Unauthorized: Missing auth token");
    //   }

    //   // Decode the token to get the `sub` (userId)
    //   let userId: string | null = null;
    //   try {
    //     const decodedToken = jwt.decode(authToken) as { sub: string } | null;
    //     if (!decodedToken?.sub) {
    //       throw new Error("Unauthorized: Invalid token");
    //     }
    //     userId = decodedToken.sub;
    //   } catch (error: unknown) {
    //     throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
    //   }

      // Generate cuid and token
      const cuid = createId();
      const token = nanoid(6);

      // Insert the profile record
      await ctx.db.insert(profiles).values({
        cuid,
        token,
        user: authToken,
        provider: "clerk",
        createdBy: authToken,
        updatedBy: authToken,
      });

      // Return the new profile's cuid
      return { cuid };
    }),

  // Get Profile by User ID
  getByUser: publicProcedure
    .input(z.object({ user: z.string() }))
    .query(async ({ ctx, input }) => {
    //   const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;
    const authToken = "user_2feGexcPqJqxlGcSW5CXhZB5t6g"

    //   if (!authToken) {
    //     throw new Error("Unauthorized: Missing auth token");
    //   }

    //   let userId: string | null = null;
    //   try {
    //     const decodedToken = jwt.decode(authToken) as { sub: string } | null;
    //     if (!decodedToken?.sub) {
    //       throw new Error("Unauthorized: Invalid token");
    //     }
    //     userId = decodedToken.sub;
    //   } catch (error: unknown) {
    //     throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
    //   }

      // Retrieve the profile details for the specified user
      const profileDetails = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.createdBy, input.user),
      });

      return profileDetails ?? null;
    }),

    /**
     * GetByCUID
     * This function is used to retrieve a profile by its CUID.
     * It takes a string input parameter 'profile' which is the CUID of the profile to be retrieved.
     * The function retrieves the profile details from the database using the CUID.
     * If the profile is found, it returns the profile details as an object.
     * If the profile is not found, it returns null.
     */
    getByCUID: publicProcedure
    
    .input(z.object({ profile: z.string() }))
    .query(async ({ ctx, input }) => {
      const authToken = ctx.headers.get('x-profile-id') as string | undefined;
    

    //   if (!authToken) {
    //     throw new Error("Unauthorized: Missing auth token");
    //   }

    //   let userId: string | null = null;
    //   try {
    //     const decodedToken = jwt.decode(authToken) as { sub: string } | null;
    //     if (!decodedToken?.sub) {
    //       throw new Error("Unauthorized: Invalid token");
    //     }
    //     userId = decodedToken.sub;
    //   } catch (error: unknown) {
    //     throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
    //   }

      // Retrieve the profile details for the specified user
      const profileDetails = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.cuid, input.profile),
      });

      return profileDetails ?? null;
    }),
});