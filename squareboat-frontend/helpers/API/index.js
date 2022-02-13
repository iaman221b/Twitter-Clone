export default (() => {
  let url = process.env.NEXT_PUBLIC_BASE_URL;
 
  return {
    //   user
    'USER_SIGNUP': url + 'user',
    'USER_LOGIN': url + 'user/login',
    'USER_LISTING': url + 'user/listing',
    'FOLLOW_USER': url + 'user/follow',
    'UNFOLLOW_USER': url + 'user/unfollow',


    // feeds
    'FEEDS': url + 'feeds',

  }
})()



