import express from "express";
import { checkAuthenticated } from "../controllers/passport.config.js";
import Slot from "../models/Slot.js";

export const router = express.Router();

router.get("/:club/admin", checkAuthenticated, async (req, res) => {
	const user = req.user;
	const slots = await Slot.find({ id: { $in: user.room.slots } });
	console.log(slots);
	res.render("admin", {
		user,
		slots,
	});
});
