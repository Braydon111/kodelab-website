import { client } from "../lib/sanity";
import { BlogCard } from "./blog-card";

export interface BlogPost {
  slug: string | null;
  mainImageUrl: string | null;
  categories: any[];
  _createdAt: string | null;
  body: any;
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
    <section className="relative max-w-[1400px] w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">Blog</h1>
      <p className="leading-7 text-muted-foregroung mt-2">
        Insights from the Dev Team
      </p>
      <div className="flex my-10 gap-6">
        {data.map((post) => (
          <BlogCard key={post._id} content={post} />
        ))}
      </div>
    </section>
  );
}

async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc)
  {
    _id,
    title,
    "slug": slug.current,
    author->{name, "image":image.asset->url},
    "mainImageUrl": mainImage.asset->url,
    "categories": categories[]->{title},
    _createdAt,
    _updatedAt,
    publishedAt,
    body
  }`;

  const data = await client.fetch(query);

  return data;
}
