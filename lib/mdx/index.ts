import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Path to our articles
const ARTICLES_PATH = path.join(process.cwd(), 'app', 'writing', 'articles');

// Get all article filenames
export const getArticleFilenames = (): string[] => {
  return fs.readdirSync(ARTICLES_PATH)
    .filter(path => /\.mdx?$/.test(path));
};

// Get article data from filename
export const getArticleFromSlug = async (slug: string) => {
  const articlePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(articlePath, 'utf8');
  
  const { content, data } = matter(source);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
    scope: data,
  });
  
  return {
    mdxSource,
    frontMatter: {
      slug,
      ...data,
    },
  };
};

// Get all articles with frontmatter
export const getAllArticles = async () => {
  const articles = getArticleFilenames();
  
  return Promise.all(
    articles.map(async (slug) => {
      const { frontMatter } = await getArticleFromSlug(slug.replace(/\.mdx?$/, ''));
      return frontMatter;
    })
  ).then(articles => 
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
};