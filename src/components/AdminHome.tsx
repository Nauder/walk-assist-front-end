import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";

export default function AdminHome() {
  const {usuario} = useContext(AuthContext);

  return (
    <>
      <h1 className="text-xl mb-6">{"Olá Adm " + usuario.nome}</h1>
      <ul className="flex items-center space-x-4">
        <li>
          <a
            href="/usuario/create"
            className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border">Criar Usuário
          </a>
        </li>
      </ul>
    </>
  );
}