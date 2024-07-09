import { client } from "@/app/lib/sanity";
import { BlogPost } from "../page";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import { format, parseISO } from "date-fns";
import { PortableText } from "next-sanity";

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  const updatedAtDate = data._updatedAt && parseISO(data._updatedAt);
  const publishedAtDate = data.publishedAt && parseISO(data.publishedAt);

  const formattedUpdatedAtDate =
    updatedAtDate && format(updatedAtDate, "MMM dd, yyyy");
  const formattedPublishedAtDate =
    publishedAtDate && format(publishedAtDate, "MMM dd, yyyy");
  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 justify-center">
        <h1 className="text-4xl font-semibold lg:text-5xl">{data.title}</h1>
        <div className="flex flex-row items-center space-x-4 z-10 mt-2">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={data.author.image ?? ""}
            className="h-11 w-11 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col mt-[-2px]">
            <p className="text-lg font-bold text-foreground/70 relative z-10">
              {data.author.name}
            </p>
            <p className="text-sm font-medium text-foreground/50 mt-[-2px]">
              {formattedPublishedAtDate ?? formattedUpdatedAtDate}
            </p>
          </div>
        </div>
      </div>
      <div className="flex my-10 gap-6 w-full relative">
        <Image
          height="800"
          width="1920"
          alt="Avatar"
          src={data.mainImageUrl ?? ""}
          className="h-[500px] rounded-xl w-full object-cover object-top"
          quality={100}
        />
      </div>
      <div className="mt-8 prose prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary prose-h1:mt-10 prose-h2:mt-8 prose-h3:mt-4 w-full max-w-full">
        <PortableText value={data.body} />
      </div>
    </PageWrapper>
  );
}

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData(slug: string) {
  const query = `*[_type == 'post' && slug.current == '${slug}']
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
    shortDescription,
    body
    }[0]`;

  const data: BlogPost = await client.fetch(query);

  return data;
}
