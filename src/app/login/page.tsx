"use client";

import Image from "next/image";
import {useContext, useState} from 'react';
import {useRouter} from 'next/navigation'
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "@/providers/AuthProvider";
import {AxiosUtil} from "@/util/AxiosUtil";
import axios from "axios";
import {md5} from 'js-md5';
import ContexMessages from "@/components/ContexMessages";
import {MessageContext} from "@/providers/MessageProvider";

export default function Login() {
  const {loginUser} = useContext(AuthContext);
  const {setErro} = useContext(MessageContext);
  const [endereco, setEndereco] = useState('');
  const [porta, setPorta] = useState(0);
  const [registro, setRegistro] = useState(0);
  const [senha, setSenha] = useState('');
  const router = useRouter()

  const onSubmit = async () => {
    localStorage.setItem('servidor', `http://${endereco}:${porta}/`)
    console.log(localStorage.getItem('servidor'))
    axios.post(`${localStorage.getItem('servidor')}login`, {registro, "senha": md5(senha)})
      .then(function (response) {
        if (response.data.success) {
          localStorage.setItem('token', `Bearer ${response.data.token}`);
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
          setCredentials(jwtDecode(response.data.token!).sub! as any);
        } else {
          setErro(response.data.message);
        }
      })
      .catch(function (error) {
        setErro(error.response.data.message);
      })
  }

  const setCredentials = async (data: { registro: string }) => {
    AxiosUtil.session.get(`${localStorage.getItem('servidor')}usuarios/${data.registro}`)
      .then(function (response) {
        console.log(response.data)
        if (response.data.success || response.data.usuario) {
          loginUser({
            registro: response.data.usuario.registro,
            email: response.data.usuario.email,
            nome: response.data.usuario.nome,
            tipo_usuario: response.data.usuario.tipo_usuario
          } as Usuario);
          router.push("/");
        } else {
          setErro(response.data.message);
          altSetCredentials(data.registro);
        }
      })
      .catch(function (error) {
        setErro(error.response.data.message);
        altSetCredentials(data.registro);
      })
  }

  const altSetCredentials = async (registro: string) => {
    AxiosUtil.session.get(`${localStorage.getItem('servidor')}usuarios`)
      .then(function (response) {
        if (response.data.success || response.data.usuarios?.length > 0) {
          response.data.usuarios.forEach((usuario: Usuario) => {
            if (usuario.registro == registro) {
              loginUser(usuario);
              router.push("/");
            }
          });
        } else if (response.data.usuario !== undefined) {
          loginUser({
            registro: response.data.usuario.registro,
            email: response.data.usuario.email,
            nome: response.data.usuario.nome,
            tipo_usuario: response.data.usuario.tipo_usuario
          } as Usuario);
          router.push("/");
        } else {
          setErro(response.data.message);
          setUnknownCredentials(registro);
        }
      })
      .catch(function (error) {
        setErro(error.response.data.message);
        setUnknownCredentials(registro);
      })
  }

  const setUnknownCredentials = async (registro: string) => {
    loginUser({
      registro: registro,
      email: "Desconhecido",
      nome: "Desconhecido",
      tipo_usuario: 1
    } as Usuario);
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 m-auto">
      <Image className="m-4" src="https://sistemas2.utfpr.edu.br/assets/logo-utf-mais-prod.svg"
             alt="logo" width={100} height={100}/>
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Entrar com a sua conta
          </h1>
          <ContexMessages/>
          <form className="space-y-4 md:space-y-6" action={onSubmit}>
            <div>
              <label htmlFor="endereco"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Endereço do
                Servidor</label>
              <input type="text" name="endereco" id="endereco"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="10.20.8.127" required={true} onChange={e => setEndereco(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="porta"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Porta do
                Servidor</label>
              <input type="number" name="porta" id="porta"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="25000" required={true} onChange={e => setPorta(+e.target.value)}/>
            </div>
            <div>
              <label htmlFor="registro"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Registro</label>
              <input type="number" name="registro" id="registro"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="123456" required={true} onChange={e => setRegistro(+e.target.value)}/>
            </div>
            <div>
              <label htmlFor="senha"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Senha</label>
              <input type="password" name="senha" id="senha" placeholder="••••••••"
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required={true} onChange={e => setSenha(e.target.value)}/>
            </div>
            <button type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
