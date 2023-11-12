"use client";

import Link from 'next/link';
import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";

export default function Header() {
  const {usuario, logoutUser, isLoading} = useContext(AuthContext);

  return (usuario === null || isLoading) ? ('') : (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b mb-4">
      <Link href="/" className="text-gray-50 hover:text-gray-400">
        Home
      </Link>

      {+usuario.tipo_usuario === 1 ?
        <nav>
          <ul className="flex items-center space-x-4">
            <Link href="/usuario" className="text-gray-50 hover:text-gray-400">
              Usuarios
            </Link>
            <Link href="/usuario" className="text-gray-50 hover:text-gray-400">
              Segmentos
            </Link>
            <Link href="/usuario" className="text-gray-50 hover:text-gray-400">
              Pontos
            </Link>
          </ul>
        </nav>
        : ''}

      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <button
              className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border"><a href="/usuario/pessoal">Pessoal</a>
            </button>
          </li>
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