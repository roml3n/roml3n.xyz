import Link from "next/link";

const BlogPostLinks = () => {
  const blogPosts = [
    { slug: "eminem-is", title: "Eminem" },
    { slug: "another-post", title: "Another Post" },
    // Add more posts as needed
  ];

  return (
    <div>
      {blogPosts.map((post) => (
        <Link key={post.slug} href={`/writing/${post.slug}`}>
          <a className="text-blue-500 hover:underline">{post.title}</a>
        </Link>
      ))}
    </div>
  );
};

export default BlogPostLinks;
