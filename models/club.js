import mongoose from "mongoose";

const { Schema } = mongoose;

const clubSchema = new Schema({
	name: String,
	location: String,
	room: String,
	queue: [String],
	slots: [
		{
			slot: Number,
			request: Schema.Types.ObjectId,
			date: Date,
			time: String,
		},
	],
});

export const Club = mongoose.model("Club", clubSchema);
