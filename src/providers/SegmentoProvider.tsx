"use client";

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {AuthContext} from "@/providers/AuthProvider";

export const SegmentoContext = createContext({} as {
  segmentos: Segmento[],
  refreshSegmentos: () => Promise<void>
  isLoading: boolean
});

const SegmentoProvider = (props: { children: React.ReactNode; }) => {
  const {usuario} = useContext(AuthContext);
  const [segmentos, setSegmentos] = useState([] as Segmento[])
  const [isLoading, setIsLoading] = useState(true)

  const getData = useCallback(async () => {
    setIsLoading(true)
    axios.get(`${localStorage.getItem('servidor')}segmentos`)
      .then(function (response) {
        setSegmentos(response.data.segmentos);
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
  }, [getData, usuario]);

  const value = useMemo(() => ({
    segmentos: segmentos,
    refreshSegmentos: getData,
    isLoading: isLoading
  }), [getData, isLoading, segmentos]);

  return (
    <SegmentoContext.Provider value={value}>
      {props.children}
    </SegmentoContext.Provider>
  );
}

export default SegmentoProvider;