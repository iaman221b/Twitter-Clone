import CONSTANTS from "../../constants";

export default {

  validateData: (req, res, next) => {
    let { feed} = req.body;

    var errors = [];

    if (!feed) {
      errors.push({
        fieldName: "feed",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "feed"),
      });
    }
    
    if(feed && feed.length > 280){

        errors.push({
            fieldName: "feed",
            message: "Feed length cannot be greater than 280 characters",
          });

    }

    if (errors && errors.length > 0) {
      return res.status(500).json({ errors }); //sends json with status code
    }

    next();
  },
  parseData: (req, res, next) => {
    let {limit , page , myFeed } = req.query

    if(!limit){
      limit = 10
    }

    if(!page){
      page = 0
    }

    req.query.page = Number(page)
    req.query.limit = Number(limit)

    if(myFeed == "false"){
      req.query.myFeed = false
    }

    console.log("getFeeds::" , myFeed)

    // req.query.getFeeds = JSON.parse(req.query.getFeeds)

    next();
  }
};
