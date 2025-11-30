import { defineConfig } from "tinacms";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  branch: process.env.HEAD || "master",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },

  // ----------------------------------------------------
  // ALWAYS DEFINE THE SCHEMA (NEVER EMPTY COLLECTIONS)
  // ONLY DISABLE THE UI IN PRODUCTION
  // ----------------------------------------------------
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "posts",
        ui: {
          enabled: isDev,   // <---- This disables Tina UI in prod safely
          dateFormat: "MMM DD YYYY",
        },
        defaultItem: () => ({
          title: "New Post",
          slug: "new-post",
          description: "Description of the post",
          tags: [],
          added: new Date().toISOString(),
        }),
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "slug", label: "Slug", type: "string", required: true },
          { name: "description", label: "Description", type: "string", required: true },
          { name: "tags", label: "Tags", type: "string", list: true },
          { name: "added", label: "Added", type: "datetime", required: true },
          { name: "updated", label: "Updated", type: "datetime" },
          { name: "body", label: "Body", type: "rich-text", isBody: true },
        ],
      },
    ],
  },

  // Search config
  search: {
    tina: {
      indexerToken: "dummy",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 1,
    maxSearchIndexFieldLength: 1,
  },

  // Authentication Tokens
  clientId: isDev ? process.env.TINACLIENTID : "",
  token: isDev ? process.env.TINATOKEN : "",
});
