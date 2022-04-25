import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs").set("views", path.join(__dirname, "./views"));
app.use(express.static(__dirname + "/public")).use(express.urlencoded());

server.listen(PORT, () => {
	console.log(`listening to port: ${PORT}`);
});

app.get("/", (req, res) => {
	res.render("index");
});
