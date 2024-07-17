import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { Icon } from "./icon";

export default function Navbar() {
  const links = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
  ];
  return (
    <div className="w-full relative p-4 flex flex-wrap justify-center bg-primary/50">
      <div className="px-1 md:px-8 mx-auto flex gap-3 w-full max-w-[1400px] justify-between items-center">
        <Link
          href={"/"}
          className="flex gap-3 h-[30px] w-1/3 relative hover:opacity-80"
        >
          <Image
            className="dark:hidden"
            src="/img/kodelab-logo-dark.png"
            fill
            alt="Logo"
            objectFit="contain"
            objectPosition="left"
          />
          <Image
            className="hidden dark:block"
            src="/img/kodelab-logo-light.png"
            fill
            alt="Logo"
            objectFit="contain"
            objectPosition="left"
          />
        </Link>

        <div
          className={cn("flex gap-4 w-fit font-bold text-xl text-foreground")}
        >
          <NavLinks links={links} />
        </div>
      </div>
      <div className="w-full max-w-[1400px] px-1 md:px-8 mx-auto flex gap-3 justify-between pt-6">
        <Link
          href={"https://insightconsulting.co.za/"}
          className="flex gap-3 items-center hover:opacity-80"
        >
          <Icon
            className="mt-[2px]"
            name={"MoveLeft"}
            size={16}
            color="hsl(var(--primary))"
          />
          <p>Back to Insight Consulting</p>
        </Link>
        {/* <Breadcrumbs /> */}
      </div>
    </div>
  );
}
