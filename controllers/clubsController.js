import mongoose from "mongoose";
import Club from "../models/Club.js";

export const club_create = async (req, res, next) => {
	console.log(req.body);
	const club = new Club({
		name: req.body.name,
		location: req.body.location,
		room: req.body.name + "_" + req.body.location,
	});
	const savedClub = await club.save();
	res.redirect("/");
};
