import mongoose from "mongoose";
const { Schema } = mongoose;

const bidSchema = new Schema({
	clubId: Schema.Types.ObjectId,
	customerId: Schema.Types.ObjectId,
	songTitle: String,
	artist: String,
	url: String,
	value: Number,
});

export const Bid = mongoose.model("Bid", bidSchema);
