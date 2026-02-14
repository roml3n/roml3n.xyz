import { writingPosts } from "@/app/data/writingPosts";
import { getSubstackPosts, type WritingPost } from "@/lib/substack";

const SUBSTACK_URL = process.env.SUBSTACK_URL;

export async function getWritingPosts(limit = 20): Promise<WritingPost[]> {
  if (!SUBSTACK_URL) return writingPosts;

  try {
    const substackPosts = await getSubstackPosts(SUBSTACK_URL, limit);
    if (substackPosts.length > 0) {
      return substackPosts;
    }
  } catch (error) {
    console.error("Failed to load Substack posts:", error);
  }

  return writingPosts;
}
