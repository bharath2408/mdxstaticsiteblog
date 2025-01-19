"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import DocSearch from "./DocSearch";

const links = [{ displayName: "Blog", herf: "/blog" }];

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <header className="flex justify-between items-center py-9 px-5 md:px-0">
      <div className="flex items-center space-x-5">
        <Link href={"/"} className="flex space-x-2 items-center">
          <Image
            src={
              theme === "light"
                ? "/mdxstaticsiteblog/light-union.svg"
                : "/mdxstaticsiteblog/dark-union.svg"
            }
            width={36}
            height={36}
            alt="logo"
            priority
          />
          <div className="text-2xl">
            Meta<span className="font-bold">Blog</span>
          </div>
        </Link>
        <DocSearch />
      </div>
      <div className="flex space-x-10">
        <nav className="space-x-10">
          {links.map((l, idx) => (
            <Link href={l.herf} key={idx}>
              {l.displayName}
            </Link>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          className="focus:outline-none"
          aria-label="Toggle theme"
        >
          <Image
            src={
              theme === "light"
                ? "/mdxstaticsiteblog/light-toggle.svg"
                : "/mdxstaticsiteblog/dark-toggle.svg"
            }
            alt="theme toggle"
            width={48}
            height={28}
            priority
          />
        </button>
      </div>
    </header>
  );
}
