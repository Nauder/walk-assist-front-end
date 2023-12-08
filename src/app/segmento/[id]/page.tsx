"use client";

import {useCallback, useContext, useEffect, useState} from 'react';
import axios from "axios";
import ContentCard from "@/components/ContentCard";
import ContexMessages from "@/components/ContexMessages";
import {MessageContext} from "@/providers/MessageProvider";
import {SegmentoContext} from "@/providers/SegmentoProvider";
import {PontoContext} from "@/providers/PontoProvider";
import Image from "next/image";

export default function UpdateSegmento({params}: Readonly<{ params: { id: string } }>) {
  const {setSucesso, setErro} = useContext(MessageContext);
  const {refreshSegmentos} = useContext(SegmentoContext);
  const {pontos} = useContext(PontoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pontoInicial, setPontoInicial] = useState({} as Ponto);
  const [pontoFinal, setPontoFinal] = useState({} as Ponto);
  const [status, setStatus] = useState(false);
  const [distancia, setDistancia] = useState(0);
  const [direcao, setDirecao] = useState('');

  const onSubmit = async () => {
    if (pontoFinal.ponto_id === pontoInicial.ponto_id) {
      setErro("Pontos Inicial e Final devem ser diferentes");
    } else {
      axios.put(`${localStorage.getItem('servidor')}segmentos/${params.id}`, {
        "ponto_inicial": pontoInicial.ponto_id,
        "ponto_final": pontoFinal.ponto_id,
        "status": (status ? 1 : 0),
        distancia,
        direcao
      }).then(function (response) {
        setErro('');
        setSucesso(response.data.message)
        refreshSegmentos();
      })
        .catch(function (error) {
          setSucesso('')
          setErro(error.response.data.message);
        })
    }
  }

  const getInitialData = useCallback(async () => {
    setIsLoading(true);
    axios.get(`${localStorage.getItem('servidor')}segmentos/${params.id}`)
      .then(function (response) {
        if (response.data.success || response.data.segmento) {
          setPontoInicial(pontos.filter(ponto => ponto.nome === response.data.segmento.ponto_inicial)[0]);
          setPontoFinal(pontos.filter(ponto => ponto.nome === response.data.segmento.ponto_final)[0]);
          setDirecao(response.data.segmento.direcao);
          setDistancia(response.data.segmento.distancia);
          setStatus(response.data.segmento.status === 1);
          setIsLoading(false);
          console.log(status)
        } else {
          setErro(response.data.message);
        }
      })
      .catch(function (error) {
        setErro(error.response.data.message);
      })
  }, [params.id, pontos, setErro]);

  useEffect(() => {
    if (axios.defaults.headers.common['Authorization'] && pontos.length > 0) {
      getInitialData();
    }
  }, [getInitialData, pontos.length])

  return (
    <ContentCard>
      <h1
        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Editar Segmento {params.id}
      </h1>
      <p className="text-center text-sm">* = campo obrigatório</p>
      <ContexMessages/>
      {isLoading ?
        <div className="flex flex-wrap items-center justify-center">
          <Image src="/loading.gif" alt="Loading" width={200} height={200}/>
        </div> :
        <form className="space-y-4 md:space-y-6" action={onSubmit}>
          <div className="flex flex-wrap items-end">
            <div className="m-4 w-1/4">
              <label htmlFor="pontoInicial"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Ponto Inicial</label>
              <select name="pontoInicial" required={true} defaultValue={pontoInicial.ponto_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e =>
                        setPontoInicial(pontos.filter(ponto => ponto.ponto_id == +e.target.value)[0])}>
                {pontos.map(ponto => {
                  return (
                    <option value={ponto.ponto_id} key={ponto.ponto_id}>{ponto.nome}</option>
                  )
                })}
              </select>
            </div>
            <div className="m-4 w-1/4">
              <label htmlFor="pontoFinal"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Ponto Final</label>
              <select name="pontoFinal" required={true} defaultValue={pontoFinal.ponto_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e =>
                        setPontoFinal(pontos.filter(ponto => ponto.ponto_id == +e.target.value)[0])}>
                {pontos.map(ponto => {
                  return (
                    <option value={ponto.ponto_id} key={ponto.ponto_id}>{ponto.nome}</option>
                  )
                })}
              </select>
            </div>
            <div className="m-4 w-1/12">
              <label htmlFor="distancia"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Distância</label>
              <input type="number" name="distancia" id="distancia" defaultValue={distancia} step=".01"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="10" required={true} onChange={e => setDistancia(+e.target.value)}/>
            </div>
            <div className="m-4 w-1/6">
              <label htmlFor="direcao"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Direção</label>
              <input type="text" name="direcao" id="direcao" defaultValue={direcao}
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Frente" required={true} onChange={e => setDirecao(e.target.value)}/>
            </div>
            <div className="m-4 w-1/12">
              <label htmlFor="status"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Livre?</label>
              <input type="checkbox" name="status" id="status" defaultChecked={status}
                     className=""
                     onChange={e => setStatus(e.target.checked)}/>
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
