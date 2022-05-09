import express from "express";
import { openRoom } from "../controllers/roomController.js";
import Bid from "../models/Bid.js";
import User from "../models/User.js";
export const router = express.Router();

router.post("/room", express.json(), async (req, res) => {
	console.log(req.body);
	const user = await User.findOne({ id: req.user.id });
	user.room.opened = req.body.opened;
	await user.save();
	res.send("<h1>hellow</h1>");
});
