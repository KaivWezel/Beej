import mongoose from "mongoose";

const { Schema } = mongoose;

const clubSchema = new Schema({
	clubName: String,
	location: String,
	requestLimit: Number,
	slots: [
		{
			slot: Number,
			request: ObjectId,
		},
	],
});

export const Club = mongoose.model("Club", clubSchema);
