import mongoose from "mongoose";

const { Schema } = mongoose;

const slotSchema = new Schema({
	time: String,
	room: String,
	name: String,
	amount: Number,
	song: String,
});

export default mongoose.model("slot", slotSchema);
