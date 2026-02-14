export type WritingPost = {
  title: string;
  href: string;
  description: string;
  date: string;
  previewImage: string;
  previewAlt: string;
};

const DEFAULT_FALLBACK_IMAGE = "/images/about/about-office.webp";

const decodeXmlEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const stripHtml = (value: string) =>
  decodeXmlEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractTag = (itemXml: string, tagName: string) => {
  const match = itemXml.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match?.[1]?.trim() ?? "";
};

const extractImageFromHtml = (html: string) => {
  const srcMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return srcMatch?.[1] ?? "";
};

const extractImage = (itemXml: string) => {
  const mediaUrlMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (mediaUrlMatch?.[1]) return mediaUrlMatch[1];

  const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (enclosureMatch?.[1]) return enclosureMatch[1];

  const encoded = extractTag(itemXml, "content:encoded");
  if (encoded) {
    const fromContent = extractImageFromHtml(encoded);
    if (fromContent) return fromContent;
  }

  const description = extractTag(itemXml, "description");
  if (description) {
    const fromDescription = extractImageFromHtml(description);
    if (fromDescription) return fromDescription;
  }

  return "";
};

const toMonthYear = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  })
    .format(parsed)
    .replace("/", ".");
};

export async function getSubstackPosts(substackUrl: string, limit = 20): Promise<WritingPost[]> {
  const sanitizedBase = substackUrl.trim().replace(/\/$/, "");
  const feedUrl = sanitizedBase.endsWith("/feed") ? sanitizedBase : `${sanitizedBase}/feed`;

  const response = await fetch(feedUrl, {
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`Substack feed request failed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];

  return itemMatches.slice(0, limit).map(([, itemXml]) => {
    const title = decodeXmlEntities(extractTag(itemXml, "title"));
    const href = decodeXmlEntities(extractTag(itemXml, "link"));
    const descriptionHtml = extractTag(itemXml, "description");
    const description = stripHtml(descriptionHtml);
    const pubDate = extractTag(itemXml, "pubDate");
    const previewImage = decodeXmlEntities(extractImage(itemXml) || DEFAULT_FALLBACK_IMAGE);

    return {
      title: title || "Untitled",
      href,
      description: description || "Read on Substack",
      date: toMonthYear(pubDate),
      previewImage,
      previewAlt: title || "Substack post cover",
    };
  });
}
