import { defineConfig } from "tinacms";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  branch: process.env.HEAD || "master",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
  schema: isDev
    ? {
        collections: [
          {
            name: "post",
            label: "Posts",
            path: "posts",
            defaultItem: () => ({ title: "New Post", added: new Date(), tags: [] }),
            ui: { dateFormat: "MMM DD YYYY" },
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
      }
    : { collections: [] }, // disable Tina in production
  search: {
    tina: {
      indexerToken: "dummy",        // dummy token for prod
      stopwordLanguages: ["eng"],   // must have at least 1
    },
    indexBatchSize: 1,              // ≥1
    maxSearchIndexFieldLength: 1,   // ≥1
  },
  clientId: isDev ? process.env.TINACLIENTID : "",  // only use real client in dev
  token: isDev ? process.env.TINATOKEN : "",       // only use real token in dev
});
