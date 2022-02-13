import { Router } from "express";
import feedsValidator from "./feeds.validator";
import {createFeed , getFeeds} from "./feeds.controller";
// import { login } from "./user.controller";

import auth_middleware from '../../middleware/auth'

const router = new Router();

router.get("/", [auth_middleware , feedsValidator.parseData], getFeeds);

router.post("/", [auth_middleware ,feedsValidator.validateData], createFeed);

// router.post("/login", userValidator.validateLogin, login);

export default router;
