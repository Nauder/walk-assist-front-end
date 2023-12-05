import {useContext, useState} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import {MessageContext} from "@/providers/MessageProvider";
import {PontoContext} from "@/providers/PontoProvider";
import ContexMessages from "@/components/ContexMessages";
import axios from "axios";
import Rota from "@/components/Rota";

export default function RotaSearch() {
  const {setSucesso, setErro} = useContext(MessageContext);
  const {pontos} = useContext(PontoContext);
  const [pontoInicial, setPontoInicial] = useState({} as Ponto);
  const [pontoFinal, setPontoFinal] = useState({} as Ponto);
  const [rota, setRota] = useState([] as Segmento[])

  function isEmpty(obj: object) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  const onSubmit = async () => {
    if (!isEmpty(pontoInicial) && !isEmpty(pontoFinal)) {
      axios.post(`${localStorage.getItem('servidor')}rotas`, {
        "origem": pontoInicial.nome,
        "destino": pontoFinal.nome
      }).then(function (response) {
        setErro('');
        setSucesso(response.data.message)
        console.log(response)
        setRota(response.data.rota)
      })
        .catch(function (error) {
          setSucesso('')
          setErro(error.response.data.message);
        })
    } else {
      setSucesso('');
      setErro('Por favor selecione os pontos');
    }
  }

  return (
    <>
      <h2 className="text-lg text-center">Calcular Rota:</h2>
      <ContexMessages/>
      <div className="flex justify-center">
        <div className="m-4 w-1/6">
          <label htmlFor="pontoInicial"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Ponto Inicial</label>
          <select name="pontoInicial" required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={e =>
                    setPontoInicial(pontos.filter(ponto => ponto.ponto_id == +e.target.value)[0])}>
            <option disabled selected value="">Ponto Inicial</option>
            {pontos.map(ponto => {
              return (
                <option value={ponto.ponto_id} key={ponto.ponto_id}>{ponto.nome}</option>
              )
            })}
          </select>
        </div>
        <div className="m-4 w-1/6">
          <label htmlFor="pontoFinal"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Ponto Final</label>
          <select name="pontoFinal" required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={e =>
                    setPontoFinal(pontos.filter(ponto => ponto.ponto_id == +e.target.value)[0])}>
            <option disabled selected value="">Ponto Final</option>
            {pontos.map(ponto => {
              return (
                <option value={ponto.ponto_id} key={ponto.ponto_id}>{ponto.nome}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="m-4 w-min mx-auto">
        <button onClick={() => onSubmit()}
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Calcular
        </button>
      </div>
      <Rota rota={rota}/>
    </>
  );
}