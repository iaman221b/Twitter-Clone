import { Feeds } from "./feeds.model";
import { RESPONSE } from "../../common/responseHandler";
import { validators } from "../../common/validators";
import { UserService } from "../user/user.service";

import BaseDao from "../../common/dao/index";
const feedDao = new BaseDao(Feeds);

const createFeed = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { feed } = req.body;

      let user = req.user;

      let _feed = new Feeds({
        feed,
        userId: validators.convertToObjectIds(user._id),
      });

      let result = await feedDao.save(_feed);

      resolve(result);
    } catch (error) {
      console.log(error.message);
      return RESPONSE.ServerError(res);
    }
  });
};

const getFeeds = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {}
      let user = await UserService.getUser(req, res);
      let { following } = user;
      let { page, limit, myFeed } = req.query;

      if (myFeed) {
        following = [];
        following[0] = validators.convertToObjectIds(user._id);
        query = {
          userId: { $in: following },
        };
      } else {
        for (let i = 0; i < following.length; i++) {
          following[i] = validators.convertToObjectIds(following[i]);
        }
        query = {
          $and: [
            { userId: { $in: following } },
            { userId: { $ne: validators.convertToObjectIds(user._id) } },
          ],
        };
      }

      let sort = { created: -1 };

      let data = await feedDao.findAndPopulate(
        query,
        { feed: 1, created: 1 },
        page,
        limit,
        "name , email",
        sort
      );

      resolve(data);
    } catch (error) {
      console.log(error.message);
      return RESPONSE.ServerError(res);
    }
  });
};

const getFeedCount = async (req, res) => {
  try {
    let user = await UserService.getUser(req, res);
    let { following } = user;
    let { myFeed } = req.query;

    if (myFeed) {
      following = [];
      following[0] = validators.convertToObjectIds(user._id);
    } else {
      for (let i = 0; i < following.length; i++) {
        following[i] = validators.convertToObjectIds(following[i]);
      }
    }

    let query = {
      userId: { $in: following },
    };

    let count = await feedDao.countDocuments(query);
    return count;
  } catch (err) {
    console.log(err);
  }
};

export const FeedService = {
  createFeed,
  getFeeds,
  getFeedCount,
};
