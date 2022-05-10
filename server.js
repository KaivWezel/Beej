import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import mongoose from "mongoose";
import passport from "passport";
import { router as authRouter } from "./Routers/authRouter.js";
import { router as clubRouter } from "./Routers/clubRouter.js";
import { router as roomRouter } from "./Routers/roomRouter.js";
import { initializePassport } from "./controllers/passport.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const url_db = process.env.DB_HOST;

server.listen(PORT, () => {
	console.log(`listening to port: ${PORT}`);
});

// Databse connection
const connection = await mongoose.connect(url_db);
if (connection) {
	console.log("mongodb ready");
}

app.set("view engine", "ejs").set("views", path.join(__dirname, "./views"));

app
	.use(express.static(path.join(__dirname, "/public")))
	.use(express.urlencoded())
	.use(express.json());

// passport middlewares
initializePassport(passport);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: url_db,
			ttl: 60 * 60,
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Router middlewares
app.use(authRouter).use(clubRouter).use(roomRouter);

// Routes
app.get("/", (req, res) => {
	res.render("index");
});

io.on("connection", (socket) => {
	console.log("user connected");
	socket.on("join-room", (roomId) => {
		socket.join(roomId);
		socket.to(roomId).emit("user-joined");
	});
	socket.on("bid:high", (roomId) => {
		console.log("high bid");
		socket.to(roomId).emit("bid:high");
	});
});
