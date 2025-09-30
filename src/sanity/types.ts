import type { Image } from "sanity";

export type Profile = {
  name: string;
  role?: string;
  github?: string;
  email?: string;
  linkedin?: string;
  cvUrl?: string;
  location?: string;
  avatar?: Image;
  bio?: any;
};

export type Project = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  cover?: Image;
  tech?: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
};
