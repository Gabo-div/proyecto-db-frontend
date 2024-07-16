"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

type Props = {
  basePath?: string;
  links: {
    name: string;
    href: string;
  }[];
};

export default function LayoutLinks({ basePath, links }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === (basePath ?? "") + (href === "/" ? "" : href);
  };

  return (
    <div className="flex items-center space-x-2 border-b-2 border-b-astronaut-900 px-4 dark:border-b-zinc-700">
      {links.map((link) => (
        <div key={link.name + link.href}>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={twJoin(
              "hover:bg-white/10 hover:text-white",
              isActive(link.href)
                ? "text-white"
                : "text-white/50 hover:text-white",
            )}
          >
            <Link href={(basePath ?? "") + link.href}>{link.name}</Link>
          </Button>
          <div
            className={twJoin(
              "mt-1 h-[2px] translate-y-[2px]",
              isActive(link.href) ? "bg-white" : "bg-transparent",
            )}
          />
        </div>
      ))}
    </div>
  );
}
