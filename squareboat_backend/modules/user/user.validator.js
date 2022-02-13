import CONSTANTS from "../../constants";
import {validators} from "../../common/validators";

export default {
  isAuthenticated: (req, res, next) => {
    console.log("inside user validation");
    next();
  },

  validateData: (req, res, next) => {
    let { name, email, password} = req.body;

    var errors = [];

    if (!name) {
      errors.push({
        fieldName: "name",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "name"),
      });
    }

    if (!email) {
      errors.push({
        fieldName: "email",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email"),
      });
    }
    if (!password) {
      errors.push({
        fieldName: "password",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace(
          "{{key}}",
          "password"
        ),
      });
    }

    if(!validators.isValidEmail(email)){

      errors.push({
        fieldName: "email",
        message: "Enter a valid email address"
      });

    }

    if (errors && errors.length > 0) {
      return res.status(500).json({ errors }); //sends json with status code
    }

    next();
  },

  validateLogin: (req, res, next) => {
    let {email, password} = req.body;

    var errors = [];
    if (!email) {
      errors.push({
        fieldName: "email",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email"),
      });
    }

    if (!password) {
      errors.push({
        fieldName: "password",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace(
          "{{key}}",
          "password"
        ),
      });
    }

    if (errors && errors.length > 0) {
      return res.status(500).json({ errors }); //sends json with status code
    }

    next();

  },

  validateFollow:(req, res, next) => {
    let {followerId} = req.body;

    var errors = [];
    if (!followerId) {
      errors.push({
        fieldName: "followerId",
        message: CONSTANTS.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "followerId"),
      });
    }

    if(followerId && !validators.isMongoObjectId(followerId)){
      errors.push({
        fieldName: "followerId",
        message: "Invalid Follower Id",
      });
    }


    if (errors && errors.length > 0) {
      return res.status(500).json({ errors }); //sends json with status code
    }

    next();

  },
};
