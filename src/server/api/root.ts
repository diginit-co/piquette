import { favoriteRouter } from "~/server/api/routers/services/favorite";
import { saveRouter } from "~/server/api/routers/services/save";
import { likeRouter } from "~/server/api/routers/services/like";
import { dislikeRouter } from "~/server/api/routers/services/dislike";
import { archiveRouter } from "./routers/services/archive";
import { pinRouter } from "./routers/services/pin";
import { restRouter } from "~/server/api/routers/services/rest";
import { businessRouter } from "~/server/api/routers/business";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // generic rest router
  rest: restRouter,
  // service routers
  favorite: favoriteRouter,
  like: likeRouter,
  dislike: dislikeRouter,
  archive: archiveRouter,
  save: saveRouter,
  pin: pinRouter,
  //model routers
  business: businessRouter,
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
