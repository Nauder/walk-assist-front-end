import {useContext} from "react";
import {MessageContext} from "@/providers/MessageProvider";

export default function ContexMessages() {
  const {sucesso, erro, setSucesso, setErro} = useContext(MessageContext);

  return <div className="flex flex-col justify-center w-1/3 mx-auto">
    {sucesso === '' ? '' :
      <button className="text-green-500 border border-green-200 p-1.5 rounded hover:border-green-500"
              onClick={() => setSucesso('')}>{sucesso}</button>}
    {erro === '' ? '' :
      <button className="text-red-500 border border-red-200 p-1.5 rounded hover:border-red-500"
              onClick={() => setErro('')}>{erro}</button>}
  </div>
}
