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

export const TECHS_QUERY = groq /* groq */ `
array::unique(*[_type=="project" && defined(tech)].tech[]) | order(^ asc)
`;

export const PROJECTS_FILTERED_QUERY = groq /* groq */ `
*[_type=="project" && (
  !defined($tech) || $tech == "" || $tech in tech
)]
| order(defined(order) desc, featured desc, _updatedAt desc){
  _id, title, "slug": slug.current, description, cover, tech, repoUrl, liveUrl, featured, order
}
`;

export const EXPERIENCES_QUERY = groq /* groq */ `
*[_type=="experience"] | order(defined(order) desc, coalesce(end, now()) desc, start desc){
  _id, role, company, location, start, end, summary, highlights, tech
}
`;
