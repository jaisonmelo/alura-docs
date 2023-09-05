import { emitirAddDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");
console.log(tokenJwt);

const listaDocumentos = document.getElementById("lista-documentos");
const formAdicionaDocumento = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");
const botaoLogout = document.getElementById("botao-logout");

botaoLogout.addEventListener("click", () => {
  removerCookie("tokenJwt");
  alert("Usuário deslogado com sucesso!");
  window.location.href = "/login/index.html";
});

formAdicionaDocumento.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAddDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
        <a href="./documento/index.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}"> ${nomeDocumento} </a>
    `;
}

function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);
  listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };
