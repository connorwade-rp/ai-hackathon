import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { MessageContext } from "../ai/aiSuggestions";

export const sites = sqliteTable("sites", {
  id: integer("id").primaryKey(),
  domain: text("domain").unique().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const sitesRelations = relations(sites, ({ one, many }) => ({
  pages: many(pages),
  codeBundles: many(codeBundles),
  aiContext: one(aiContext),
}));

export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey(),
  siteId: integer("site_id").notNull(),
  url: text("url").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const pagesRelations = relations(pages, ({ one, many }) => ({
  site: one(sites, {
    fields: [pages.siteId],
    references: [sites.id],
  }),
  axeViolations: many(axeViolations),
}));

export const axeViolations = sqliteTable("axe_violations", {
  id: integer("id").primaryKey(),
  pageId: integer("page_id").notNull(),
  violations: text("violations", { mode: "json" }).$type<any>().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const axeViolationsRelations = relations(axeViolations, ({ one }) => ({
  page: one(pages, {
    fields: [axeViolations.pageId],
    references: [pages.id],
  }),
}));

export const codeBundles = sqliteTable("code_bundles", {
  id: integer("id").primaryKey(),
  siteId: integer("site_id").notNull(),
  bundle: text("bundle").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const codeBundlesRelations = relations(codeBundles, ({ one }) => ({
  site: one(sites, {
    fields: [codeBundles.siteId],
    references: [sites.id],
  }),
}));

export const aiContext = sqliteTable("ai_context", {
  id: integer("id").primaryKey(),
  siteId: integer("site_id")
    .notNull()
    .references(() => sites.id),
  context: text("context", { mode: "json" }).$type<MessageContext>().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
