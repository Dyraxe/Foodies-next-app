"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import classes from "./nav-link.module.css";

export default function NavLink({ href = "", children }) {
  const path = usePathname();
  return (
    <li>
      <Link
        className={`${classes.link} ${path.startsWith(href) ? classes.active : ""}`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
