"use client";

import React, {createContext, useEffect, useReducer, useState} from 'react';
import {redirect, usePathname, useRouter} from "next/navigation";
import {AppSettings} from "@/config/config";
import {AxiosUtil} from "@/util/AxiosUtil";
import axios from "axios";

export const AuthContext = createContext({} as {
  usuario: Usuario;
  loginUser: (data: Usuario) => void;
  logoutUser: () => void;
  isLoading: boolean;
});

const AuthContextProvider = (props: { children: React.ReactNode; }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [url] = useState(usePathname());
  const [usuario, setUsuario] = useReducer((prev: any, cur: any) => {
    cur === null ? localStorage.removeItem('usuario') : localStorage.setItem('usuario', JSON.stringify(cur));
    return cur;
  }, JSON.parse(typeof window !== "undefined" ? localStorage.getItem('usuario')! : '{}'));
  const router = useRouter()


  const loginUser = (data: Usuario) => {
    setIsLoading(true);
    localStorage.setItem('usuario', JSON.stringify({
      registro: data.registro,
      nome: data.nome,
      email: data.email,
      tipo_usuario: data.tipo_usuario,
    })); // Save the user object in local storage
    setUsuario({
      registro: data.registro,
      nome: data.nome,
      email: data.email,
      tipo_usuario: data.tipo_usuario,
    }); // Set user data
    setIsLoading(false);
  };

  const logoutUser = () => {
    AxiosUtil.session.post(`${localStorage.getItem('servidor')}logout`)
      .then(function (response) {
        // handle success
        router.push('/login');
        setIsLoading(true);
        setUsuario(null); // Empty user data state
        localStorage.removeItem('token');
        localStorage.removeItem('servidor');
      })
      .catch(function (error) {
        console.error(error.response.data.message);
      })
  };

  useEffect(() => {
    setIsLoading(true);
    const localUser = JSON.parse(localStorage.getItem('usuario')!);
    if (localUser?.registro) {
      setUsuario({
        registro: localUser.registro,
        nome: localUser.nome,
        email: localUser.email,
        tipo_usuario: localUser.tipo_usuario,
      }); // Set user data
    } else if (!url.includes('login')) {
      redirect('/login/');
    }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    setIsLoading(false)
  }, [url])


  return (
    <AuthContext.Provider value={{usuario, loginUser, logoutUser, isLoading}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;