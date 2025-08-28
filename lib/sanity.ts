import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "../sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
});

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source: { asset: { _ref: string } }) =>
  builder.image(source);

// GROQ queries for blogs
export const getAllBlogsQuery = `*[_type == "blog" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImage,
  tags
}`;

export const getBlogBySlugQuery = `*[_type == "blog" && slug.current == $slug && isPublished == true][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImage,
  content,
  tags
}`;



// Helper functions
export const getAllBlogs = async () => {
  return await client.fetch(getAllBlogsQuery);
};

export const getBlogBySlug = async (slug: string) => {
  return await client.fetch(getBlogBySlugQuery, { slug });
};
