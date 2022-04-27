import express from "express";
import Club from "../models/Club.js";
import { club_create } from "../controllers/clubsController.js";

const app = express();
export const router = express.Router();

router.get("/", (req, res) => {
	res.render("admin");
});

router.post("/create-club", club_create);
