"use client";

import {useEffect, useState} from 'react';
import axios from "axios";
import ContentCard from "@/components/ContentCard";
import UsuarioTable from "@/components/UsuarioTable";

export default function CreateUsuario() {
    const [usuarios, setUsuarios] = useState([] as Usuario[])
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const getData = async () => {
        axios.get(`${localStorage.getItem('servidor')}usuarios`)
            .then(function (response) {
                setErro('');
                setUsuarios(response.data.usuarios);
                setIsLoading(false);
            })
            .catch(function (error) {
                setSucesso('')
                setErro(error.response.data.message);
                setIsLoading(true);
            })
    }

    useEffect(() => {
        getData();
    }, [localStorage.getItem('servidor')])

    return (
        <ContentCard>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Usuarios
            </h1>
            <p className="text-green-500">{sucesso}</p>
            <p className="text-red-500">{erro}</p>
            {isLoading ? 'Carregando...' :
                <div
                    className="flex justify-center">
                    <UsuarioTable
                        usuarios={usuarios}/></div>}
        </ContentCard>
    )
}
