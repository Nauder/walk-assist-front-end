"use client";

import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import AdminHome from "@/components/AdminHome";
import UserHome from "@/components/UserHome";
import ContentCard from "@/components/ContentCard";
import Image from 'next/image'

export default function Home() {
  const {usuario, isLoading} = useContext(AuthContext);

  return isLoading ? (
    <div className="flex flex-wrap items-center justify-center"><Image src="/loading.gif" alt="Loading" width={200}
                                                                       height={200}/></div>) : (
    <ContentCard>
      {+usuario.tipo_usuario === 1 ? <AdminHome/> : <UserHome/>}
    </ContentCard>
  )
}
