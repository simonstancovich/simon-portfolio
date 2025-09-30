import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tech",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "repoUrl", title: "GitHub repo", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "order", title: "Manual order", type: "number" }),
  ],
  preview: { select: { title: "title", media: "cover" } },
});
