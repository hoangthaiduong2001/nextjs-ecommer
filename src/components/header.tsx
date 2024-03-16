import React from "react";
import { ModeToggle } from "./toggle-theme";
import Link from "next/link";
import ButtonLogout from "./button-logout";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
};

export default Header;
