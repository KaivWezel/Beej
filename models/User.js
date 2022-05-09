import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	room: {
		roomname: {
			type: String,
			required: true,
			lowercase: true,
		},
		opened: {
			type: Boolean,
			default: false,
		},
		slots: [],
	},
});

export default mongoose.model("user", userSchema);
