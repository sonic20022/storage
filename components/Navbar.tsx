import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-[100px] flex items-center justify-between">
      <h1 className="text-xl font-semibold">ashrafchowdury/vercel-database</h1>
      <div>
        <Link href="/" className="font-medium mr-6 hover:underline duration-500">@/blob</Link>
        <Link href="/" className="font-medium hover:underline duration-500">@/postgres</Link>
      </div>
    </nav>
  );
};

export default Navbar;
