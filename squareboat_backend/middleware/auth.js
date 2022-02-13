import jwt from 'jsonwebtoken'
import logger from '../common/logger'
// import redis from '../config/redis'




let auth;

export default auth = async(req, res, next) => {
  const token = req.header("x-auth-token");



  if (!token) {
    return res.status(401).json({
      message: "User Unauthorised",
    });
  }

  try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    // let client = await redis;

    // let active_token =  await client.get(decoded.user._id);

    // if(JSON.stringify(active_token) !== JSON.stringify(token)){
    //   return res.status(401).json({
    //     message: "User Unauthorised",
    //   });
    // }

    req.user = decoded.user;
    next();
  } catch (e) {
    logger.info(e)
    return res.status(401).json({
      message: "Server Error",
    });
  }
};
