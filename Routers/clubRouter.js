import express from "express";
import { checkAuthenticated } from "../controllers/passport.config.js";

export const router = express.Router();

router.get("/:club/admin", checkAuthenticated, (req, res) => {
	res.render("admin", {
		user: req.user,
	});
});
