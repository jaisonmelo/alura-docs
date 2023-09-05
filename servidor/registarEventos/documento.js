import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
import {
  addConexaoDocumento,
  encontrarConexao,
  obterUsuariosNoDocumento,
  removerConexao,
} from "../utils/conexoesDocumentos.js";

function registrarDocumentos(socket, io) {
  socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);
      if (!conexaoEncontrada) {
        socket.join(nomeDocumento);

        addConexaoDocumento({ nomeDocumento, nomeUsuario });

        socket.data = { usuarioEntrou: true };
        const usuariosNoDocumento = obterUsuariosNoDocumento(nomeDocumento);

        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);

        devolverTexto(documento.texto);
      } else {
        socket.emit("usuarios_ja_no_documento");
      }
    }

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
      const atualizacao = await atualizaDocumento(nomeDocumento, texto);
      if (atualizacao.modifiedCount) {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
      }
    });

    socket.on("excluir_documento", async (nome) => {
      const resultado = await excluirDocumento(nome);
      if (resultado.deletedCount) {
        io.emit("excluir_documento_sucesso", nome);
      }
    });

    socket.on("disconnect", () => {
      if (socket.data.usuarioEntrou) {
        removerConexao(nomeDocumento, nomeUsuario);
        const usuariosNoDocumento = obterUsuariosNoDocumento(nomeDocumento);

        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
      }
    });
  });
}

export default registrarDocumentos;
