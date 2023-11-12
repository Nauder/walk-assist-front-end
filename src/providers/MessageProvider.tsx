"use client";

import React, {createContext, useState} from "react";

export const MessageContext = createContext({} as {
  sucesso: string,
  erro: string,
  setSucesso: (sucesso: string) => void,
  setErro: (erro: string) => void,
});

const MessageProvider = (props: { children: React.ReactNode; }) => {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  return (
    <MessageContext.Provider value={{
      sucesso: sucesso,
      erro: erro,
      setSucesso: setSucesso,
      setErro: setErro
    }}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;