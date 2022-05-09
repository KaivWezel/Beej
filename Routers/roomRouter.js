import express from "express";
import User from "../models/User.js";
import Slot from "../models/Slot.js";

import {
	checkRoom,
	openRoom,
	createSlot,
} from "../controllers/roomController.js";

export const router = express.Router();

router.post("/room", openRoom, (req, res) => {
	// res.redirect(`/${req.user.username}/admin`);
	res.redirect("/");
});

router.post("/join", (req, res) => {
	res.redirect(`/${req.body.room}`);
});

router.post("/slot", createSlot, (req, res) => {
	res.redirect(`/${req.user.username}/admin`);
});

router.get("/:room", checkRoom, async (req, res) => {
	const slots = await Slot.find({ _id: req.user.room.slots });
	console.log(slots);

	res.render("room", {
		roomId: req.params.room,
		slots: slots,
	});
});
