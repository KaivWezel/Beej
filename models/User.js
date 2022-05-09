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
});

export default mongoose.model("user", userSchema);
