// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `piquette_${name}`);

/** Services
 * 
 * Favorites
 * Save
 * Like
 * Dislike
 * Archive
 * Shared
 * Pinned
 * 
 * Services are intented to work across multiple models though the actions component.
 * It's probably best to not modify these in any manner.
*/
export const favorites = createTable(
  "favorite",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  
);

export const saves = createTable(
  "save",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  
);

export const likes = createTable(
  "like",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  
);

export const dislikes = createTable(
  "dislike",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
);

export const shares = createTable(
  "share",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
);

export const archives = createTable(
  "archive",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
);

export const pins = createTable(
  "pin",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).default(createId()).notNull(),
    object: varchar("object", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
);

/** Models
 * 
 */

export const businesses = createTable(
  "business",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    token: varchar("token", { length: 32 }),
    owner: varchar("owner", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    location: varchar("location", { length: 256 }).notNull(),
    url: varchar("url", { length: 256 }),
    industry: varchar("industry", { length: 256 }),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
);