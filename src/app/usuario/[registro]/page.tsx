"use client";

import {useContext, useEffect, useState} from "react";
import {MessageContext} from "@/providers/MessageProvider";
import {UsuarioContext} from "@/providers/UsuarioProvider";
import axios from "axios";
import {md5} from "js-md5";
import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import Image from "next/image";

export default function UpdateUsuario({params}: { params: { registro: string } }) {
  const {setSucesso, setErro} = useContext(MessageContext);
  const {refreshUsuarios} = useContext(UsuarioContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const onSubmit = async () => {
    axios.put(`${localStorage.getItem('servidor')}usuarios/${params.registro}`, {nome, email, "senha": md5(senha)})
      .then(function (response) {
        setErro('');
        setSucesso(`Usuario ${params.registro} editado com sucesso`)
        refreshUsuarios();
      })
      .catch(function (error) {
        setSucesso('')
        setErro(error.response.data.message);
      })
  }

  const getInitialData = async () => {
    setIsLoading(true);
    axios.get(`${localStorage.getItem('servidor')}usuarios/${params.registro}`)
      .then(function (response) {
        console.log(response.data)
        if (response.data.success || response.data.usuario) {
          setNome(response.data.usuario.nome);
          setTipoUsuario(response.data.usuario.tipo_usuario);
          setEmail(response.data.usuario.email);
          setIsLoading(false);
        } else {
          setErro(response.data.message);
        }
      })
      .catch(function (error) {
        setErro(error.response.data.message);
      })
  }

  useEffect(() => {
    if (axios.defaults.headers.common['Authorization']) {
      getInitialData();
    }
  }, [axios.defaults.headers.common['Authorization']])

  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Editar Usuario {params.registro}
      </h1>
      <ContexMessages/>
      {isLoading ?
        <div className="flex flex-wrap items-center justify-center"><Image src="/loading.gif" alt="Loading" width={200}
                                                                           height={200}/></div> :
        <form className="space-y-4 md:space-y-6" action={onSubmit}>
          <div className="flex flex-wrap items-end">
            <div className="m-4 w-1/4">
              <label htmlFor="registro"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registro</label>
              <input type="number" name="registro" id="registro" readOnly={true} disabled={true}
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={params.registro}/>
            </div>
            <div className="m-4 w-1/3">
              <label htmlFor="nome"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
              <input type="text" name="nome" id="nome"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Seu Nome" required={true} onChange={e => setNome(e.target.value)}
                     defaultValue={nome}/>
            </div>
            <div className="m-4 w-1/3">
              <label htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Email</label>
              <input type="email" name="email" id="email"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="exemplo@exemplo.com" required={true} onChange={e => setEmail(e.target.value)}
                     defaultValue={email}/>
            </div>
            <div className="m-4 w-1/4">
              <label htmlFor="senha"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
              <input type="password" name="senha" id="senha" placeholder="••••••••"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required={true} onChange={e => setSenha(e.target.value)}/>
            </div>
            <div className="m-4">
              <label htmlFor="tipo"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Administrador</label>
              <input type="checkbox" name="tipo" id="tipo"
                     readOnly={true} disabled={true} checked={tipoUsuario}/>
            </div>
          </div>
          <div className="m-4 w-min">
            <button type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Salvar
            </button>
          </div>
        </form>
      }
    </ContentCard>
  )
}