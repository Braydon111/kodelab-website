import PageWrapper from "@/components/layout/PageWrapper";
import { client } from "../lib/sanity";
import { BlogCard } from "./blog-card";

export interface BlogPost {
  slug: string | null;
  mainImageUrl: string | null;
  categories: { title?: string; shortDescription?: string }[];
  _createdAt: string | null;
  shortDescription: string | null;
  body?: any;
  _id: string;
  author: {
    name: string | null;
    image: string | null;
  };
  _updatedAt: string | null;
  publishedAt: string | null;
  title: string | null;
}

export default async function page() {
  const data: BlogPost[] = await getData();
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold lg:text-5xl">Blog</h1>
      <p className="leading-7 text-muted-foregroung mt-4 text-lg">
        Insights from the Dev Team
      </p>
      <div className="flex my-10 gap-8">
        {data.map((post) => (
          <BlogCard key={post._id} content={post} />
        ))}
      </div>
    </PageWrapper>
  );
}

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc)
  {
    _id,
    title,
    shortDescription,
    "slug": slug.current,
    author->{name, "image":image.asset->url},
    "mainImageUrl": mainImage.asset->url,
    "categories": categories[]->{title},
    _createdAt,
    _updatedAt,
    publishedAt,
  }`;

  const data = await client.fetch(query);

  return data;
}
