import React from "react";

export default function UsuarioTable(props: { usuarios: Usuario[]; }) {
    return (
        <div className="w-8/12 rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th className="px-6 py-4">Registro</th>
                        <th className="px-6 py-4">Nome</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Administrador</th>
                    </tr>
                    </thead>
                    <tbody className="border-b dark:border-neutral-500">
                    {props.usuarios.map(usuario => {
                        return (
                            <tr key={usuario.registro}>
                                <td className="whitespace-nowrap px-6 py-2 font-medium">{usuario.registro}</td>
                                <td className="whitespace-nowrap px-6 py-2">{usuario.nome}</td>
                                <td className="whitespace-nowrap px-6 py-2">{usuario.email}</td>
                                <td className="whitespace-nowrap px-6 py-2">{usuario.tipo_usuario === "1" ? 'sim' : 'não'}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}