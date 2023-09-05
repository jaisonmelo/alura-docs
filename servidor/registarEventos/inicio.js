import { addDocumento, encontrarDocumento, obterDocumentos } from "../db/documentosDb.js";

function registrarEventosInicio(socket, io) {
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();
    devolverDocumentos(documentos);
  });

  socket.on("add_documento", async (nome) => {
    const documentoExiste = (await encontrarDocumento(nome)) !== null;

    if (documentoExiste) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await addDocumento(nome);
      if (resultado.acknowledged) {
        io.emit("add_documento_interface", nome);
      }
    }
  });
}
export default registrarEventosInicio;
