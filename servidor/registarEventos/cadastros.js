import { cadastrarUsuarios, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastrar-usuario", async (dados) => {
    const usuario = await encontrarUsuario(dados.nome);
    console.log(usuario);
    if (usuario === null) {
      const resultado = await cadastrarUsuarios(dados);
      if (resultado.acknowledged) {
        socket.emit("cadastro_sucesso");
      } else {
        socket.emit("cadastro_erro");
      }
    } else {
      socket.emit("usuario_existente");
    }
  });
}

export default registrarEventosCadastro;
