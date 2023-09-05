const socket = io();

function emitirCadastrarUsuario(dados) {
  socket.emit("cadastrar-usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"));
socket.on("cadastro_erro", () => alert("Erro ao realizar o cadastro!"));
socket.on("usuario_existente", () => alert("Usuário já existe!"));

export { emitirCadastrarUsuario };
