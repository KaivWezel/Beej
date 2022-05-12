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
	const bid = req.body.bid;
	const room = await User.findOne({ "room.roomanme": roomId });
	const slot = await Slot.findOne({ id: req.body.slot });
	const newBid = await compare_bid(slot, bid);
	res.json({ newBid });
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

const compare_bid = async (slot, bid) => {
	console.log(slot, bid);
	if (!slot.amount) {
		console.log("new bid");
		slot["amount"] = bid.amount;
		slot["name"] = bid.name;
		slot["song"] = bid.songTitle + " - " + bid.songArtist;
		const newSlot = await slot.save();
		return newSlot;
	} else if (slot.amount < bid.amount) {
		console.log("higher bid");
		slot["amount"] = bid.amount;
		slot["name"] = bid.name;
		slot["song"] = bid.songTitle + " - " + bid.songArtist;
		const newSlot = await slot.save();
		return newSlot;
	} else {
		console.log("nothing happened");
		return slot;
	}
};
