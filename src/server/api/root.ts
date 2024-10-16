import { postRouter } from "~/server/api/routers/post";
import { favoriteRouter } from "~/server/api/routers/favorite";
import { saveRouter } from "~/server/api/routers/save";
import { restRouter } from "~/server/api/routers/rest";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rest: restRouter,
  favorite: favoriteRouter,
  save: saveRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
