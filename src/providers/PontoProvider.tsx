"use client";

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {AuthContext} from "@/providers/AuthProvider";

export const PontoContext = createContext({} as {
  pontos: Ponto[],
  refreshPontos: () => Promise<void>
  isLoading: boolean
});

const PontoProvider = (props: { children: React.ReactNode; }) => {
  const {usuario} = useContext(AuthContext);
  const [pontos, setPontos] = useState([] as Ponto[])
  const [isLoading, setIsLoading] = useState(true)

  const getData = useCallback(async () => {
    setIsLoading(true)
    axios.get(`${localStorage.getItem('servidor')}pontos`)
      .then(function (response) {
        setPontos(response.data.pontos);
      })
      .catch(function (error) {
        console.error(error);
      })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (usuario !== null && axios.defaults.headers.common['Authorization']) {
      getData();
    }
  }, [usuario, getData]);

  const value = useMemo(() => ({
    pontos: pontos,
    refreshPontos: getData,
    isLoading: isLoading
  }), [getData, isLoading, pontos]);

  return (
    <PontoContext.Provider value={value}>
      {props.children}
    </PontoContext.Provider>
  );
}

export default PontoProvider;