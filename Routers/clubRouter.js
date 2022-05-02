import express from "express";
import Club from "../models/Club.js";
import { club_create } from "../controllers/clubsController.js";

const app = express();
export const router = express.Router();
