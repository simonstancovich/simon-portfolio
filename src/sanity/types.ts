import { PortableTextBlock } from "next-sanity";
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
  bio?: PortableTextBlock[];
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

export type Experience = {
  _id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  summary?: string;
  highlights?: string[];
  tech?: string[];
};
