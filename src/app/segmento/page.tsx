"use client";

import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import SegmentoTable from "@/components/tables/SegmentoTable";
import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";

export default function GetSegmento() {
  const {usuario} = useContext(AuthContext);

  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Segmentos
      </h1>
      {usuario != null && usuario.tipo_usuario === 1 ?
        <a
          href="/segmento/create"
          className="rounded bg-gray-900 hover:bg-gray-800 p-1.5 border">Criar
        </a> : ''
      }
      <ContexMessages/>
      <div className="flex justify-center"><SegmentoTable/></div>
    </ContentCard>
  )
}
