"use client";

import {useState} from 'react';
import {AppSettings} from "@/config/config";
import axios from "axios";
import ContentCard from "@/components/ContentCard";
import { md5 } from 'js-md5';

export default function CreateUsuario() {
  const [registro, setRegistro] = useState(0);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const onSubmit = async () => {
    axios.post(`${AppSettings.API_ENDPOINT}usuarios`, {
      registro, nome, email, "senha": md5(senha), "tipo_usuario": (tipoUsuario ? 1 : 0)
    }).then(function (response) {
      setErro('');
      setSucesso(`usuário ${nome} criado com sucesso`)
    })
      .catch(function (error) {
        setSucesso('')
        setErro(error.response.data.message);
      })
  }

  return (
    <ContentCard>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Criar Conta
      </h1>
      <p className="text-green-500">{sucesso}</p>
      <p className="text-red-500">{erro}</p>
      <form className="space-y-4 md:space-y-6" action={onSubmit}>
        <div className="flex flex-wrap items-end">
          <div className="m-4 w-1/4">
            <label htmlFor="registro"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Registro</label>
            <input type="number" name="registro" id="registro"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="123456" required={true} onChange={e => setRegistro(+e.target.value)}/>
          </div>
          <div className="m-4 w-1/3">
            <label htmlFor="nome"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
            <input type="text" name="nome" id="nome"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Seu Nome" required={true} onChange={e => setNome(e.target.value)}/>
          </div>
          <div className="m-4 w-1/3">
            <label htmlFor="email"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Email</label>
            <input type="email" name="email" id="email"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="exemplo@exemplo.com" required={true} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="m-4 w-1/4">
            <label htmlFor="senha"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Senha</label>
            <input type="password" name="senha" id="senha" placeholder="••••••••"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required={true} onChange={e => setSenha(e.target.value)}/>
          </div>
          <div className="m-4">
            <label htmlFor="tipo"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Administrador</label>
            <input type="checkbox" name="tipo" id="tipo"
                   className=""
                   onChange={e => setTipoUsuario(e.target.checked)}/>
          </div>
        </div>
        <div className="m-4 w-min">
          <button type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Criar
          </button>
        </div>
      </form>
    </ContentCard>
  )
}
