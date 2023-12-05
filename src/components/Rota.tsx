import React from "react";

export default function Rota(props: Readonly<{ rota: Segmento[] }>) {

  return (
    <div className="rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Inicio</th>
            <th className="px-6 py-4">Fim</th>
            <th className="px-6 py-4">Distancia</th>
            <th className="px-6 py-4">Direção</th>
          </tr>
          </thead>
          <tbody className="border-b dark:border-neutral-500">
          {props.rota.map((segmento, index) => {
            return (
              <tr key={segmento.segmento_id}>
                <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.ponto_inicial}</td>
                <td
                  className={"whitespace-nowrap px-6 py-2" + (index + 1 == props.rota.length ? " text-yellow-300" : "")}>{segmento.ponto_final}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.distancia}</td>
                <td className="whitespace-nowrap px-6 py-2">{segmento.direcao}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <p className="text-yellow-300">⛋ Destino</p>
      </div>
    </div>
  )
}