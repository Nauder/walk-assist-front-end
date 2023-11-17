"use client";

import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import PontoTable from "@/components/tables/PontoTable";

export default function GetPonto() {
  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Pontos
      </h1>
      <a
        href="/ponto/create"
        className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border">Criar
      </a>
      <ContexMessages/>
      <div className="flex justify-center"><PontoTable/></div>
    </ContentCard>
  )
}
