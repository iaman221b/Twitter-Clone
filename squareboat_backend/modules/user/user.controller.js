import { UserService } from "./user.service";
import { RESPONSE } from "../../common/responseHandler";
import logger from "../../common/logger";
import {UserPresentors} from './user.presentor'

export const createUser = async (req, res) => {
  try {
    let data = await UserService.createUser(req, res);

    let result = await UserService.JwtSignIn(data);

    return RESPONSE.Created(result, res);
  } catch (error) {
    // console.log(error.message);
    logger.info(error);
    return RESPONSE.ServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    let data = await UserService.login(req, res);

    let result = await UserService.JwtSignIn(data);

    return RESPONSE.Ok(result, res);
  } catch (error) {
    logger.info(error);
    return RESPONSE.ServerError(res);
  }
};

export const followUser = async (req, res) => {
  try {

    let data = await UserService.followUser(req, res);

    return RESPONSE.Ok(data, res);

  } catch (error) {

    logger.info(error);
    return RESPONSE.ServerError(res);
    
  }
}

export const unFollowUser = async (req, res) => {
  try {

    let data = await UserService.unFollowUser(req, res);

    return RESPONSE.Ok(data, res);

  } catch (error) {

    logger.info(error);
    return RESPONSE.ServerError(res);
    
  }
}

export const getUserListing = async(req, res) =>{

  try {

    let data = await UserService.getUserListing(req, res);

    let modifiedData = UserPresentors.Userlisting(data , req , res)

    return RESPONSE.Ok(modifiedData , res);

  } catch (error) {

    logger.info(error);
    return RESPONSE.ServerError(res);
    
  }

}


