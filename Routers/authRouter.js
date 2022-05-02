import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { db } from "../server.js";
import Club from "../models/Club.js";
import { club_create } from "../controllers/clubsController.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const router = express.Router();

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup", async (req, res, next) => {
	try {
		User.findOne({ username: req.body.username }, async (err, user) => {
			if (user) {
				res.redirect("/login");
			} else {
				const hashedPass = await bcrypt.hash(req.body.password, 10);
				console.log(hashedPass);
				const newUser = new User({
					username: req.body.username,
					password: hashedPass,
				});
				const user = await newUser.save();
			}
		});
	} catch (err) {}
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

passport.use(
	new LocalStrategy((username, password, done) => {
		try {
			User.findOne({ username: username }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return doen(null, false, { message: `Passwords don't match` });
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	})
);
