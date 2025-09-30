import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
  perspective: "published",
  stega: false,
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}) {
  return client.fetch<T>(query, params, { next: { revalidate, tags } });
}
