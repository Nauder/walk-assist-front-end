import {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";

export default function UserHome() {
  const {usuario} = useContext(AuthContext);

  return (
    <h1 className="text-xl">{"Olá " + usuario.nome}</h1>
  );
}