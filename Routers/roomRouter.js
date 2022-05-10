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
	const session = req.session;
	session.roomId = req.body.room;
	res.redirect(`/${req.body.room}`);
});

router.post("/slot", createSlot, (req, res) => {
	res.redirect(`/${req.user.username}/admin`);
});

router.post("/bid", express.json(), async (req, res) => {
	const roomId = req.session.roomId;
	const bid = req.body;
	const room = await User.findOne({ "room.roomanme": roomId });
	console.log(bid);
	res.json({ foo: "bar" });
});

router.get("/slots", async (req, res) => {
	console.log(req.session);
	const slots = await Slot.find({ room: req.session.roomId }).exec();
	res.send(JSON.stringify(slots));
});

router.get("/:room", checkRoom, async (req, res) => {
	const session = req.session;
	if (!session.roomId) {
		session.roomId = req.params.room;
	}
	const slots = await Slot.find({ _id: req.user.room.slots });

	res.render("room", {
		roomId: req.params.room,
		slots: slots,
	});
});
