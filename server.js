import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import mongoose from "mongoose";
import { router as authRouter } from "./Routers/authRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const url_db = process.env.DB_HOST;

server.listen(PORT, () => {
	console.log(`listening to port: ${PORT}`);
});

app.set("view engine", "ejs").set("views", path.join(__dirname, "./views"));
app
	.use(express.static(path.join(__dirname, "/public")))
	.use(express.urlencoded())
	.use(express.json())
	.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			store: MongoStore.create({
				mongoUrl: url_db,
				touchAfter: 48 * 3600,
			}),
		})
	);

// passport middlewares
app.use(passport.initialize()).use(passport.session());

// Router middlewares
app.use(authRouter);

// Routes
app.get("/", (req, res) => {
	res.render("index");
});

// Databse connection
export const db = async () => {
	try {
		const connection = await mongoose.connect(url_db);
		console.log("MongoDb connected");
		return connection;
	} catch (err) {
		console.log(err);
	}
};

db();
