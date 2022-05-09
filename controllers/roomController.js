import User from "../models/User.js";
import { io } from "../server.js";
import Slot from "../models/Slot.js";

export const openRoom = async (req, res, next) => {
	console.log(req.body);
	const user = await User.findOne({ id: req.user.id });
	user.room.opened = req.body.opened;
	await user.save();
	next();
};

export const checkRoom = async (req, res, next) => {
	const user = await User.findOne({ "room.roomname": req.params.room });
	req.user = user;
	if (user) {
		try {
			if (user.room.opened) {
				next();
			} else {
				throw console.error("opened not available");
			}
		} catch (err) {
			console.log(err);
		}
	} else {
		res.redirect("/");
	}
};

export const createSlot = async (req, res, next) => {
	const user = await User.findOne({ id: req.user.id });
	const slot = new Slot({
		time: req.body.timer,
		room: user.room.roomname,
	});
	const savedSlot = await slot.save();
	user.room.slots.push(savedSlot.id);
	await user.save();
	next();
};
