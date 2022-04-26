import mongoose from "mongoose";
import { Club } from "../models/Club.js";

export const saveTest = async () => {
	const newClub = new Club({
		name: "fluor",
		location: "Amersfoort",
		room: "fluor_amersfoort",
	});
	const Club = await newClub.save();
	console.log(Club);
};
