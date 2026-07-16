import { getSubstackPosts, type WritingPost } from "./substack";

const SUBSTACK_URL = "https://roml3n.substack.com";

export async function getWritingPosts(limit = 20): Promise<WritingPost[]> {
  try {
    return await getSubstackPosts(SUBSTACK_URL, limit);
  } catch (err) {
    console.error("Error fetching writing posts:", err);
    return [];
  }
}

export type { WritingPost };