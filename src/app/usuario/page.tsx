"use client";

import ContentCard from "@/components/ContentCard";
import UsuarioTable from "@/components/tables/UsuarioTable";
import ContexMessages from "@/components/ContexMessages";

export default function CreateUsuario() {
  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Usuarios
      </h1>
      <a
        href="/usuario/create"
        className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border">Criar Usuário
      </a>
      <ContexMessages/>
      <div className="flex justify-center"><UsuarioTable/></div>
    </ContentCard>
  )
}
