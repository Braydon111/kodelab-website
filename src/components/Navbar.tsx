import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex m-3 gap-3 w-full">
      <Link href={"/"}>Home</Link>
      <Link href={"/blog"}>Blog</Link>
    </div>
  );
}
