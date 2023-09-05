const conexoesDocumentos = [];

function encontrarConexao(nomeDocumento, nomeUsuario) {
  return conexoesDocumentos.find((conexao) => {
    return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario;
  });
}
function addConexaoDocumento(conexao) {
  conexoesDocumentos.push(conexao);
}
function obterUsuariosNoDocumento(nomeDocumento) {
  return conexoesDocumentos
    .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
    .map((conexao) => conexao.nomeUsuario);
}

function removerConexao(nomeDocumento, nomeUsuario) {
  const index = conexoesDocumentos.findIndex((conexao) => {
    return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario;
  });

  if (index !== -1) {
    conexoesDocumentos.splice(index, 1);
    console.log(conexoesDocumentos);
  }
}

export { addConexaoDocumento, obterUsuariosNoDocumento, removerConexao, encontrarConexao };
