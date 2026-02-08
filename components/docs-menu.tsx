"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();
  if (pathname !== "/" && !pathname.startsWith("/docs")) return null;

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6 sm:text-base text-[14.5px]">
      {ROUTES.map((item, index) => {
        const customStyles = "";
        
        const modifiedItems = {
          ...item,
          href: item.externalLink ? item.href : `/docs${item.href}`,
          level: 0,
          isSheet,
          customStyles: customStyles,
          collapsible: item.collapsible,
          externalLink: item.externalLink,
        };

        return (
          <div key={item.title + index || `route-${index}`}>
            <SubLink {...modifiedItems} />
            {item.isSeparator && <div className="h-[1px] bg-border my-2" />}
          </div>
        );
      })}
    </div>
  );
}
