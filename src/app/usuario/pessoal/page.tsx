"use client";

import {useContext, useEffect, useState} from "react";
import {MessageContext} from "@/providers/MessageProvider";
import {UsuarioContext} from "@/providers/UsuarioProvider";
import axios from "axios";
import {md5} from "js-md5";
import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import {AuthContext} from "@/providers/AuthProvider";

export default function Pessoal() {
  const {setSucesso, setErro} = useContext(MessageContext);
  const {usuario, logoutUser, isLoading} = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const onSubmit = async () => {
    axios.put(`${localStorage.getItem('servidor')}usuarios/${usuario.registro}`, {nome, email, "senha": md5(senha)})
      .then(function (response) {
        logoutUser();
      })
      .catch(function (error) {
        setSucesso('')
        setErro(error.response.data.message);
      })
  }

  const deleteCadastro = async () => {
    axios.delete(`${localStorage.getItem('servidor')}usuarios/${usuario.registro}`)
      .then(function (response) {
        logoutUser();
      })
      .catch(function (error) {
        setSucesso('')
        setErro(error.response.data.message);
      })
  }

  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Minha Página
      </h1>
      <ContexMessages/>
      {isLoading ? <p>Carregando...</p> :
        <form className="space-y-4 md:space-y-6" action={onSubmit}>
          <div className="flex flex-wrap items-end">
            <div className="m-4 w-1/4">
              <label htmlFor="registro"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registro</label>
              <input type="number" name="registro" id="registro" readOnly={true} disabled={true}
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={usuario.registro}/>
            </div>
            <div className="m-4 w-1/3">
              <label htmlFor="nome"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
              <input type="text" name="nome" id="nome"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Seu Nome" required={true} onChange={e => setNome(e.target.value)}
                     defaultValue={usuario.nome}/>
            </div>
            <div className="m-4 w-1/3">
              <label htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Email</label>
              <input type="email" name="email" id="email"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="exemplo@exemplo.com" required={true} onChange={e => setEmail(e.target.value)}
                     defaultValue={usuario.email}/>
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
                     readOnly={true} disabled={true} checked={usuario.tipo_usuario == 1}/>
            </div>
          </div>
          <div className="m-4 flex gap-4 place-content-end">
            <button type="submit"
                    className="w-1/6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Salvar Edições
            </button>
            <button type="button" onClick={() => deleteCadastro()}
                    className="w-1/6 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Remover Cadastro
            </button>
          </div>
        </form>
      }
    </ContentCard>
  )
}