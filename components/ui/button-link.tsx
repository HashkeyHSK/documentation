"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import React from "react";
import { VariantProps } from "class-variance-authority";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
} 