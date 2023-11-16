import React, {useContext} from "react";
import TrashButton from "@/components/buttons/TrashButton";
import axios from "axios";
import {UsuarioContext} from "@/providers/UsuarioProvider";
import {MessageContext} from "@/providers/MessageProvider";
import PencilButton from "@/components/buttons/PencilButton";
import {redirect} from "next/navigation";
import {PontoContext} from "@/providers/PontoProvider";

export default function UsuarioTable() {
  const {pontos, refreshPontos, isLoading} = useContext(PontoContext);
  const {setSucesso, setErro} = useContext(MessageContext);

  const deletePonto = async (id_ponto: number) => {
    axios.delete(`${localStorage.getItem('servidor')}pontos/${id_ponto}`)
      .then(function (response) {
        setSucesso(`Ponto ${id_ponto} removido com sucesso`);
        setErro('');
        refreshPontos();
      })
      .catch(function (error) {
        setSucesso('');
        setErro(error);
      })
  }

  return isLoading ? (<p className="text-center">Carregando...</p>) : (
    <div className="w-8/12 rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
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
                <td className="whitespace-nowrap px-3 py-2"><PencilButton
                  href={`/usuario/${ponto.ponto_id}`}/></td>
                <td className="whitespace-nowrap px-3 py-2"><TrashButton
                  onClick={() => deletePonto(ponto.ponto_id)}/></td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}