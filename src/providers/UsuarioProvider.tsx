"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "@/providers/AuthProvider";

export const UsuarioContext = createContext({} as {
  usuarios: Usuario[],
  refreshUsuarios: () => Promise<void>
  isLoading: boolean
});

const UsuarioProvider = (props: { children: React.ReactNode; }) => {
  const {usuario} = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([] as Usuario[])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    axios.get(`${localStorage.getItem('servidor')}usuarios`)
      .then(function (response) {
        setUsuarios(response.data.usuarios);
      })
      .catch(function (error) {
        console.error(error);
      })
    setIsLoading(false)
  }

  useEffect(() => {
    if (usuario !== null && usuario.tipo_usuario === 1) {
      getData();
    }
  }, [usuario]);

  return (
    <UsuarioContext.Provider value={{usuarios: usuarios, refreshUsuarios: getData, isLoading: isLoading}}>
      {props.children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;