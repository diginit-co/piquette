import { postRouter } from "~/server/api/routers/post";
import { favoriteRouter } from "~/server/api/routers/favorite";
import { saveRouter } from "~/server/api/routers/save";
import { likeRouter } from "~/server/api/routers/like";
import { dislikeRouter } from "~/server/api/routers/dislike";
import { archiveRouter } from "./routers/archive";
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
  like: likeRouter,
  dislike: dislikeRouter,
  archive: archiveRouter,
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
