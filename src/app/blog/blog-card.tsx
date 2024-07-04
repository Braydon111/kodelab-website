"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { BlogPost } from "./page";
import { parseISO, format } from "date-fns";
import Link from "next/link";

export function BlogCard({ content }: { content: BlogPost }) {
  const updatedAtDate = content._updatedAt && parseISO(content._updatedAt);
  const publishedAtDate = content.publishedAt && parseISO(content.publishedAt);

  const formattedUpdatedAtDate =
    updatedAtDate && format(updatedAtDate, "MMM dd, yyyy");
  const formattedPublishedAtDate =
    publishedAtDate && format(publishedAtDate, "MMM dd, yyyy");

  return (
    <div className="max-w-[calc((100%-96px)/3)] w-full group/card rounded-xl bg-background">
      <Link
        href={`/blog/${content.slug}`}
        className={cn(
          " cursor-pointer overflow-hidden relative card h-[410px] rounded-xl shadow-xl mx-auto backgroundImage flex flex-col justify-between p-4 bg-contain"
        )}
      >
        <div
          className="absolute top-0 left-0 w-full h-[200px]"
          style={{
            background: `url(${content.mainImageUrl})`,
            backgroundColor: "#000",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black to-transparent h-[90px]" />
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60" />
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={content.author.image ?? ""}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-background relative z-10">
              {content.author.name}
            </p>
            <p className="text-sm text-background/70">
              {formattedPublishedAtDate ?? formattedUpdatedAtDate}
            </p>
          </div>
        </div>
        <div className="text content h-[180px]">
          <h1 className="font-bold text-xl md:text-2xl text-foreground group-hover/card:text-gray-50 relative z-10 line-clamp-3">
            {content.title}
          </h1>
          <p className="font-normal text-sm text-foreground group-hover/card:text-gray-50 relative z-10 my-4 line-clamp-3">
            {content.shortDescription}
          </p>
        </div>
      </Link>
    </div>
  );
}
