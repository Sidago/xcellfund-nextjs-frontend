import Link from "next/link";
import React from "react";

type Props = {
  aria_label?: string;
  external?: boolean;
  label?: string;
  target?: string;
  type?: "text" | "email" | "phone";
  url?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function AppLink({
  aria_label,
  external,
  label,
  target,
  type,
  url = "#",
  className,
  children,
}: Props) {
  const finalUrl =
    type === "email" ? `mailto:${url}` : type === "phone" ? `tel:${url}` : url;
  return (
    <Link
      href={finalUrl}
      aria-label={aria_label}
      target={target}
      className={className}
      prefetch={!external}
    >
      {children ? children : label}
    </Link>
  );
}
