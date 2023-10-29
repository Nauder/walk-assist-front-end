"use client";

import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import AdminHome from "@/components/AdminHome";
import UserHome from "@/components/UserHome";
import ContentCard from "@/components/ContentCard";

export default function Home() {
  const {usuario, isLoading} = useContext(AuthContext);

  return isLoading ? (<div>loading...</div>) : (
    <ContentCard>
      {+usuario.tipo_usuario === 1 ? <AdminHome/> : <UserHome/>}
    </ContentCard>
  )
}
