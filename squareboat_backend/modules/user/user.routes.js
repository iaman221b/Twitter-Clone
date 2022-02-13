import { Router } from "express";
import userValidator from "./user.validator";
import { createUser, login , followUser, unFollowUser , getUserListing } from "./user.controller";
import auth_middleware from '../../middleware/auth'


const router = new Router();

router.post("/", userValidator.validateData, createUser);

router.post("/login", [userValidator.validateLogin], login);

router.post("/follow", [auth_middleware , userValidator.validateFollow], followUser);

router.post("/unfollow", [auth_middleware , userValidator.validateFollow], unFollowUser);

router.get("/listing", [auth_middleware], getUserListing);




export default router;
