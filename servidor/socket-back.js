import "dotenv/config";
import registrarEventosInicio from "./registarEventos/inicio.js";
import registrarEventosDocumento from "./registarEventos/documento.js";
import registrarEventosCadastro from "./registarEventos/cadastros.js";
import registrarEventosLogin from "./registarEventos/login.js";
import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
});
