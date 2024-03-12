import React from "react";
import { ModeToggle } from "./toggle-theme";
import Link from "next/link";

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
      </ul>
      <ModeToggle />
    </div>
  );
};

export default Header;
