import mongoose from "mongoose";

const { Schema } = mongoose;

const slotSchema = new Schema({
	time: String,
	room: String,
	currentBid: {
		name: String,
		amount: Number,
		Song: String,
	},
});

export default mongoose.model("slot", slotSchema);
