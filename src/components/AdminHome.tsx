import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import RotaSearch from "@/components/RotaSearch";

export default function AdminHome() {
  const {usuario} = useContext(AuthContext);

  return (
    <>
      <h1 className="text-xl mb-6 text-center">{"Olá Adm " + usuario.nome}</h1>
      <RotaSearch/>
    </>
  );
}