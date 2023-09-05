import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://jaisonprocer:VxKFjlcx3CGpH1ao@node-express.imkyq2z.mongodb.net/");

let documentosColecao;
let usuariosColecao;
try {
  await cliente.connect();
  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (error) {
  console.log("Error: " + error);
}

export { documentosColecao, usuariosColecao };
