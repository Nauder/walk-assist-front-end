import React, {useContext} from "react";
import TrashButton from "@/components/buttons/TrashButton";
import axios from "axios";
import {MessageContext} from "@/providers/MessageProvider";
import PencilButton from "@/components/buttons/PencilButton";
import {SegmentoContext} from "@/providers/SegmentoProvider";
import {AuthContext} from "@/providers/AuthProvider";

export default function SegmentoTable() {
  const {usuario} = useContext(AuthContext);
  const {segmentos, refreshSegmentos, isLoading} = useContext(SegmentoContext);
  const {setSucesso, setErro} = useContext(MessageContext);

  const deleteSegmento = async (id: number) => {
    axios.delete(`${localStorage.getItem('servidor')}segmentos/${id}`)
      .then(function (response) {
        setSucesso(response.data.message);
        setErro('');
        refreshSegmentos();
      })
      .catch(function (error) {
        setSucesso('');
        setErro(error);
      })
  }

  return isLoading || usuario == null ? (<p className="text-center">Carregando...</p>) : (
    <div className="w-8/12 rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Inicio</th>
            <th className="px-6 py-4">Fim</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Distancia</th>
            <th className="px-6 py-4">Direção</th>
          </tr>
          </thead>
          <tbody className="border-b dark:border-neutral-500">
          {segmentos.map(segmento => {
            return (
              <tr key={segmento.segmento_id}>
                <td className="whitespace-nowrap px-6 py-2 font-medium">{segmento.segmento_id}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.ponto_inicial}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.ponto_final}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.status === 1 ? 'Livre' : 'Interditado'}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.distancia}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.direcao}</td>
                {usuario.tipo_usuario === 1 ?
                  <td className="whitespace-nowrap px-3 py-2"><PencilButton
                    href={`/segmento/${segmento.segmento_id}`}/></td> : ''
                }
                {usuario.tipo_usuario === 1 ?
                  <td className="whitespace-nowrap px-3 py-2"><TrashButton
                    onClick={() => deleteSegmento(segmento.segmento_id)}/></td> : ''
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