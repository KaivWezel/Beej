import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const router = express.Router();

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup", async (req, res, next) => {
	try {
		console.log(req.body);
		User.findOne({ username: req.body.email }, async (err, user) => {
			if (user) {
				return;
			} else {
				const hashedPass = await bcrypt.hash(req.body.password, 10);
				const newUser = new User({
					email: req.body.email,
					username: req.body["club-name"],
					location: req.body.location,
					password: hashedPass,
					room: {
						roomname: req.body["club-name"] + "-" + req.body.location,
					},
				});
				const user = await newUser.save();
			}
			res.redirect("/login");
		});
	} catch (err) {
		console.log(err);
	}
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		res.redirect(`/${req.user.username}/admin`);
	}
);

router.post("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.post("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});
