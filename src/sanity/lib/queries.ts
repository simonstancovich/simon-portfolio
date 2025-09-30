import { groq } from "next-sanity";

export const PROFILE_QUERY = groq /* groq */ `
*[_type == "profile"][0]{
    name, role, github, email, linkedin, cvUrl, location, avatar, bio
}
`;

export const PROJECTS_QUERY = groq /* groq */ `
*[_type == "project"]|order(defined(order) desc, featured desc, _updatedAt desc){
  _id, title, "slug": slug.current, description, cover, tech, repoUrl, liveUrl, featured, order
}
`;
