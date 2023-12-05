"use client";

import { useContext, useState } from 'react';
import axios from "axios";
import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import { MessageContext } from "@/providers/MessageProvider";
import { PontoContext } from "@/providers/PontoProvider";

export default function CreatePonto() {
  const { setSucesso, setErro } = useContext(MessageContext);
  const { refreshPontos } = useContext(PontoContext);
  const [nome, setNome] = useState('');

  const onSubmit = async () => {
    axios.post(`${localStorage.getItem('servidor')}pontos`, { nome })
      .then(function (response) {
        setErro('');
        setSucesso(`Ponto ${nome} criado com sucesso`)
        refreshPontos();
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
        Criar Ponto
      </h1>
      <ContexMessages />
      <form className="space-y-4 md:space-y-6" action={onSubmit}>
        <div className="flex flex-wrap items-end">
          <div className="m-4 w-1/3">
            <label htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
            <input type="text" name="nome" id="nome"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nome do Ponto" required={true} onChange={e => setNome(e.target.value)} />
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
