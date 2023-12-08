import React, {useContext} from "react";
import TrashButton from "@/components/buttons/TrashButton";
import axios from "axios";
import {MessageContext} from "@/providers/MessageProvider";
import PencilButton from "@/components/buttons/PencilButton";
import {PontoContext} from "@/providers/PontoProvider";
import {AuthContext} from "@/providers/AuthProvider";
import Image from "next/image";

export default function PontoTable() {
  const {usuario} = useContext(AuthContext);
  const {pontos, refreshPontos, isLoading} = useContext(PontoContext);
  const {setSucesso, setErro} = useContext(MessageContext);

  const deletePonto = async (ponto_id: number) => {
    axios.delete(`${localStorage.getItem('servidor')}pontos/${ponto_id}`)
      .then(function (response) {
        setSucesso(`Ponto ${ponto_id} removido com sucesso`);
        setErro('');
        refreshPontos();
      })
      .catch(function (error) {
        setSucesso('');
        setErro(error);
      })
  }

  return isLoading || usuario == null ? (
    <div className="flex flex-wrap items-center justify-center"><Image src="/loading.gif" alt="Loading" width={200}
                                                                       height={200}/></div>) : (
    <div className="w-max rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Nome</th>
          </tr>
          </thead>
          <tbody className="border-b dark:border-neutral-500">
          {pontos.map(ponto => {
            return (
              <tr key={ponto.ponto_id}>
                <td className="whitespace-nowrap px-6 py-2 font-medium">{ponto.ponto_id}</td>
                <td className="whitespace-nowrap px-6 py-2">{ponto.nome}</td>
                {usuario.tipo_usuario === 1 ?
                  <td className="whitespace-nowrap px-3 py-2"><PencilButton
                    href={`/ponto/${ponto.ponto_id}`}/></td> : ''
                }
                {usuario.tipo_usuario === 1 ?
                  <td className="whitespace-nowrap px-3 py-2"><TrashButton
                    onClick={() => deletePonto(+ponto.ponto_id)}/></td> : ''
                }
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}