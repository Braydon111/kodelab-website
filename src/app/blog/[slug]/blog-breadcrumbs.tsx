"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogBreadcrumbs({ tabs }: { tabs?: string[] }) {
  const url = usePathname();
  console.log(url);
  //   const url = new URL(router);
  const segments = url.split("/").filter((segment) => segment !== "");
  const currentTabs = tabs ?? segments;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {currentTabs.map((tab, index) => {
          const isLastTab = index === currentTabs.length - 1;
          return (
            <>
              <BreadcrumbItem>
                <Link
                  className="transition-colors hover:text-foreground"
                  href={
                    isLastTab
                      ? ""
                      : `/${tab.toLowerCase().replace(/\s+/g, "-")}`
                  }
                >
                  {tab}
                </Link>
              </BreadcrumbItem>
              {!isLastTab && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
