import WritingClient from "./WritingClient";
import { writingPosts } from "@/app/data/writingPosts";
import { getSubstackPosts } from "@/lib/substack";

export const revalidate = 60 * 30;

const SUBSTACK_URL = process.env.SUBSTACK_URL;

export default async function WritingPage() {
  let posts = writingPosts;

  if (SUBSTACK_URL) {
    try {
      const substackPosts = await getSubstackPosts(SUBSTACK_URL, 20);
      if (substackPosts.length > 0) {
        posts = substackPosts;
      }
    } catch (error) {
      console.error("Failed to load Substack posts:", error);
    }
  }

  return <WritingClient posts={posts} />;
}
