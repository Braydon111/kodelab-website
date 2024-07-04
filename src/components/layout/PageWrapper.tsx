import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export default function PageWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative max-w-[1400px] w-full px-4 md:px-8 mx-auto my-16",
        className
      )}
    >
      {children}
    </section>
  );
}
