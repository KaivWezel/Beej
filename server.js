import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const url_db = process.env.DB_HOST;

app.set("view engine", "ejs").set("views", path.join(__dirname, "./views"));
app.use(express.static(__dirname + "/public")).use(express.urlencoded());

server.listen(PORT, () => {
	console.log(`listening to port: ${PORT}`);
});

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/room", (req, res) => {
	console.log(req.params.roomId);
});

app.get("/room/:roomId", (req, res) => {});

app.get("/admin", (req, res) => {
	res.render("admin");
});

app.post("/request");

connectDB().catch((err) => console.log(err));

async function connectDB() {
	const connection = await mongoose.connect(url_db);
	console.log(typeof mongooses);
}
