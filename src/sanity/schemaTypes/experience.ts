import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "start",
      title: "Start date",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "end",
      title: "End date (leave empty if current)",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
    }),
    defineField({ name: "summary", type: "text" }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "tech", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "role", subtitle: "company" } },
});
