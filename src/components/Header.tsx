"use client";

import Link from 'next/link';
import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";

export default function Header() {
  const {usuario, logoutUser, isLoading} = useContext(AuthContext);

  return (usuario === null || isLoading) ? ('') : (
    <header className="flex items-center justify-between p-6 bg-gray-800 border-b mb-4">
      <Link href="/">
        Home
      </Link>

      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <button
              onClick={logoutUser}
              className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border">Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}