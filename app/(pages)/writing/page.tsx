import WritingClient from "./WritingClient";
import { getWritingPosts } from "@/lib/getWritingPosts";

export const revalidate = 60 * 30;

export default async function WritingPage() {
  const posts = await getWritingPosts(20);

  return <WritingClient posts={posts} />;
}
