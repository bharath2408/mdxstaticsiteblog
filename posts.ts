export interface IPost {
  title: string;
  slug: string;
  author: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
}

export const posts: IPost[] = [
  {
    title: "Setting up Next.js with MDX",
    slug: "setting-up-next-js-with-MDX",
    description: "Learn how to set up Next.js with MDX for your blog.",
    author: "Bharatha kumar",
    date: "2025-01-21",
    category: "Frontend",
    thumbnail: "/mdxstaticsiteblog/images/thumbnails/next-mdx.png",
  },
];
