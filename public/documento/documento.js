import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const editorTexto = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const usuariosConectados = document.getElementById("usuarios-conectados");
tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacaoSucesso(payloadToken) {
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
  usuariosConectados.innerHTML = "";
  usuariosNoDocumento.forEach((usuario) => {
    usuariosConectados.innerHTML += `
      <li class="list-group-item">${usuario}</li>
    `;
  });
}

editorTexto.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: editorTexto.value,
    nomeDocumento: nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  editorTexto.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluido!`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };
