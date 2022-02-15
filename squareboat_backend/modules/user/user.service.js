import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";
import { User } from "./user.model";
import { RESPONSE } from "../../common/responseHandler";
// import redis from '../../config/redis'
import { validators } from "../../common/validators";
import BaseDao from "../../common/dao/index";
const userDao = new BaseDao(User);

const createUser = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { name, email, password, mobile } = req.body;

    try {
      let user = await userDao.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User Already Exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        mobile,
        status: 1,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await userDao.save(user);

      const payload = {
        user: {
          _id: user.id,
          password: user.password,
          email: user.email,
          following: user.following,
        },
      };

      resolve(payload);
    } catch (error) {
      console.log(error.message);
      return RESPONSE.ServerError(res);
    }
  });
};

const login = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ message: "User Not Found" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ message: "Invalid Credentials" }] });
      }

      let payload = {
        user: {
          _id: user.id,
          password: user.password,
          email: user.email,
          following: user.following,
        },
      };

      resolve(payload);
    } catch (error) {
      console.log(error.message);
      return RESPONSE.ServerError(res);
    }
  });
};

const JwtSignIn = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 3600000 },
        async (err, token) => {
          if (err) {
            console.log(err);
          }
          let data = {
            status: true,
            message: "success",
            access_token: token,
            token_type: "Bearer",
            expiration: moment().add(30, "days").unix(),
          };

          // let client = await redis;

          // await client.set(payload.user._id ,  token);
          // const value = await client.get(payload.user.id);

          resolve(data);
        }
      );
    } catch (error) {
      return RESPONSE.ServerError(res);
    }
  });
};

const followUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let email = req.user.email;

      let { followerId } = req.body;

      let user = await User.findOne({ email });

      user.following.unshift(followerId);

      await userDao.save(user);

      resolve(true);
    } catch (error) {
      console.log("error:::", error);

      return RESPONSE.ServerError(res);
    }
  });
};

const unFollowUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let email = req.user.email;

      let { followerId } = req.body;

      let user = await User.findOne({ email });

      const removeIndex = user.following.indexOf(followerId);

      user.following.splice(removeIndex, 1);

      console.log(user.following);

      await userDao.save(user);

      resolve(true);
    } catch (error) {
      console.log("error:::", error);

      return RESPONSE.ServerError(res);
    }
  });
};

const getUser = async (req, res) => {
  let { email } = req.user;

  let user = await userDao.findOne({ email });

  return user;
};

// const _getUserListing = async (req, res) => {
//   try {
//     let user = await getUser(req, res);

//     console.log("user::", user);

//     req.user = user;

//     let query = {};
//     query._id = { $ne: validators.convertToObjectIds(user._id) };

//     query = {
//       $and: [
//         { _id: { $ne: validators.convertToObjectIds(user._id) } },
//         { following: { $in: [validators.convertToObjectIds(user._id)] } },
//       ],
//     };

//     let users = await User.find(query, { name: 1, email: 1, isFollowing: 1 })
//       .sort({ created: -1 })
//       .lean()
//       .exec();
//     // let users = await userDao.find(query , {"name":1 , "email":1 , "isFollowing":1});

//     return users;
//   } catch (error) {
//     console.log("error:::", error);
//   }
// };

const getUserListing = async (req, res, next) => {

  let user = await getUser(req, res,);

  req.user = user;


  let pipeline = [];
  let query = { _id: { $ne: validators.convertToObjectIds(user._id) } };
  let sort = { created: -1 };

  pipeline.push({ $match: query });
  pipeline.push({ $sort: sort });

  let projection = {
    name: 1,
    email: 1,
    created: 1,
    id_:1,
    isFollowing: {
      $in: ["$_id", user.following],
    },
  };

  pipeline.push({ $project: projection });

  return userDao.aggregate(pipeline);
};

export const UserService = {
  createUser,
  login,
  JwtSignIn,
  followUser,
  unFollowUser,
  getUser,
  getUserListing,
};


