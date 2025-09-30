import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "github", type: "url" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "cvUrl", title: "CV URL (PDF)", type: "url" }),
  ],
  preview: { select: { title: "name", media: "avatar" } },
});
