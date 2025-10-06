import { defineConfig } from "tinacms";

const isDev = process.env.NODE_ENV === "development";

const config = isDev
  ? defineConfig({
      branch: process.env.HEAD || "master",
      clientId: process.env.TINACLIENTID,
      token: process.env.TINATOKEN,
      build: { outputFolder: "admin", publicFolder: "public" },
      media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
      schema: {
        collections: [
          {
            name: "post",
            label: "Posts",
            path: "posts",
            defaultItem: () => ({ title: "New Post", added: new Date(), tags: [] }),
            ui: {
              dateFormat: "MMM DD YYYY",
              filename: {
                readonly: false,
                slugify: (values) =>
                  values?.slug?.toLowerCase().replace(/ /g, "-"),
              },
            },
            fields: [
              { name: "title", label: "Title", type: "string", isTitle: true, required: true },
              { name: "slug", label: "Slug", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              { name: "tags", label: "Tags", type: "string", list: true, options: [
                  { value: "technical", label: "Technical" },
                  { value: "advice", label: "Advice" },
                  { value: "dsa", label: "DSA" },
                  { value: "learning", label: "Learning" },
                  { value: "placements", label: "Placements" },
                  { value: "work", label: "Work" },
                  { value: "personal", label: "Personal" },
                  { value: "projects", label: "Projects" },
                ],
              },
              { name: "added", label: "Added", type: "datetime", dateFormat: "MMM DD YYYY", required: true },
              { name: "updated", label: "Updated", type: "datetime", dateFormat: "MMM DD YYYY" },
              { name: "body", label: "Body", type: "rich-text", isBody: true },
            ],
          },
        ],
      },
      search: {
        tina: {
          indexerToken: process.env.TINASEARCH,
          stopwordLanguages: ["eng"], // must have at least one element
        },
        indexBatchSize: 50,            // must be >= 1
        maxSearchIndexFieldLength: 100 // must be >= 1
      },
    })
  : defineConfig({
      // Minimal production config that satisfies Tina's schema
      branch: "master",
      build: { outputFolder: "admin", publicFolder: "public" },
      media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
      schema: { collections: [] },
      search: {
        tina: {
          indexerToken: "dummy-token",        // dummy string
          stopwordLanguages: ["eng"],         // at least 1 element
        },
        indexBatchSize: 1,                     // at least 1
        maxSearchIndexFieldLength: 1           // at least 1
      },
    });

export default config;
