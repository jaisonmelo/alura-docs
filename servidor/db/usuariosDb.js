import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}
function cadastrarUsuarios({ nome, senha }) {
  const { hashSenha, salSenha } = criaHashESalSenha(senha);
  return usuariosColecao.insertOne({ nome, hashSenha, salSenha });
}

export { cadastrarUsuarios, encontrarUsuario };
