import { FeedService } from "./feeds.service";
import { RESPONSE } from "../../common/responseHandler";
import logger from "../../common/logger";
import {FeedPresentors} from './feeds.presentor'


export const createFeed = async (req, res) => {
  try {
    let data = await FeedService.createFeed(req, res);

    return RESPONSE.Created(data, res);
  } catch (error) {
    logger.info(error);
    return RESPONSE.ServerError(res);
  }
};

export const getFeeds = async (req, res) => {
    try {
      let data = await FeedService.getFeeds(req, res);
      let count = await FeedService.getFeedCount(req, res);

     let _updatedData =  FeedPresentors.Feedlisting(data , count)

  
      return RESPONSE.Created(_updatedData, res);
    } catch (error) {
      logger.info(error);
      return RESPONSE.ServerError(res);
    }
  };



