import LocalStrategy from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const initializePassport = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
			try {
				User.findOne({ email: email }, (err, user) => {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, { message: "no user with that name" });
					}
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: `Passwords don't match` });
						}
					});
				});
			} catch (err) {
				console.log(err);
				return done(err);
			}
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};

// check authentication
export function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}
