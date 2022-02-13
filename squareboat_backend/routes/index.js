import CONSTANTS from "../constants/index.js";

import UserRoutes from "../modules/user/user.routes";
import FeedRoutes from "../modules/feeds/feeds.routes";

const routes = (app) => {
  app.use(`${CONSTANTS.API_URI}/user`, UserRoutes);
  app.use(`${CONSTANTS.API_URI}/feeds`, FeedRoutes);
};

export default routes;
