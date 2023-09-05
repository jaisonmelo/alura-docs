import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
  const tokenJwt = socket.handshake.auth.token;
  try {
    const payloadToken = jwt.verify(tokenJwt, process.env.SECREDO_JWT);
    socket.emit("autorizacao_sucesso", payloadToken);
    next();
  } catch (error) {
    next(error);
  }
}

export default autorizarUsuario;
