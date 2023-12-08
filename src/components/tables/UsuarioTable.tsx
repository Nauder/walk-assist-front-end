import React, {useContext} from "react";
import TrashButton from "@/components/buttons/TrashButton";
import axios from "axios";
import {UsuarioContext} from "@/providers/UsuarioProvider";
import {MessageContext} from "@/providers/MessageProvider";
import PencilButton from "@/components/buttons/PencilButton";
import {redirect} from "next/navigation";
import Image from "next/image";

export default function UsuarioTable() {
  const {usuarios, refreshUsuarios, isLoading} = useContext(UsuarioContext);
  const {setSucesso, setErro} = useContext(MessageContext);

  const deleteUsuario = async (registro: string) => {
    axios.delete(`${localStorage.getItem('servidor')}usuarios/${registro}`)
      .then(function (response) {
        setSucesso(`Usuario ${registro} removido com sucesso`);
        setErro('');
        refreshUsuarios();
      })
      .catch(function (error) {
        setSucesso('');
        setErro(error);
      })
  }

  return isLoading ? (
    <div className="flex flex-wrap items-center justify-center"><Image src="/loading.gif" alt="Loading" width={200}
                                                                       height={200}/></div>) : (
    <div className="rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">Registro</th>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Administrador</th>
          </tr>
          </thead>
          <tbody className="border-b dark:border-neutral-500">
          {usuarios.map(usuario => {
            return (
              <tr key={usuario.registro}>
                <td className="whitespace-nowrap px-6 py-2 font-medium">{usuario.registro}</td>
                <td className="whitespace-nowrap px-6 py-2">{usuario.nome}</td>
                <td className="whitespace-nowrap px-6 py-2">{usuario.email}</td>
                <td className="whitespace-nowrap px-6 py-2">{usuario.tipo_usuario === 1 ? 'sim' : 'não'}</td>
                <td className="whitespace-nowrap px-3 py-2"><PencilButton
                  href={`/usuario/${usuario.registro}`}/></td>
                <td className="whitespace-nowrap px-3 py-2"><TrashButton
                  onClick={() => deleteUsuario(usuario.registro)}/></td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}