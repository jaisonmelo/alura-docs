import {
  alertarERedirecionar,
  atualizaTextoEditor,
  atualizarInterfaceUsuarios,
  tratarAutorizacaoSucesso,
} from "./documento.js";
import { obterCookie } from "../utils/cookies.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios);
socket.on("usuarios_ja_no_documento", () => {
  alert("Usuário já aberto em outra página.");
  window.location.href = "/";
});

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
