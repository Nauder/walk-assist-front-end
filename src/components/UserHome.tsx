import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import RotaSearch from "@/components/RotaSearch";

export default function UserHome() {
  const {usuario} = useContext(AuthContext);

  return (
    <>
      <h1 className="text-xl text-center">{"Olá " + usuario.nome}</h1>
      <RotaSearch/>
    </>
  );
}