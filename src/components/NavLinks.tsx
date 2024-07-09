"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "./DarkModeToggle";

export default function NavLinks({
  links,
}: {
  links: { title: string; href: string }[];
}) {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        console.log(link.href.split("/")[1]);
        const isLinkActive =
          (pathName.split("/")[1].includes(link.href.split("/")[1]) &&
            link.href !== "/") ||
          (pathName === "/" && link.href === "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn("hover:text-primary", isLinkActive && "text-primary")}
          >
            {link.title}
          </Link>
        );
      })}
      <DarkModeToggle />
    </>
  );
}
