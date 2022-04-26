import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
	title: String,
	artist: String,
	value: Number,
	url: String,
});
