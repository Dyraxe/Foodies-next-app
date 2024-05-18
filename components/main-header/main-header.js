import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
const headerNavLinks = [
  {
    label: "Browse meals",
    href: "/meals",
  },
  {
    label: "Foodies Community",
    href: "/community",
  },
];
export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            {headerNavLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
