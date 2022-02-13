import axios from 'axios';
import API from '../API/index';

if(typeof(localStorage) != 'undefined' && localStorage.getItem('token')){

    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')


}



export const UserSignup = (params) => {
   return axios.post(API.USER_SIGNUP, params)
};

export const UserLogin = (params) => {
    return axios.post(API.USER_LOGIN, params)
 };

 export const UserListing = () => {
    return axios.get(API.USER_LISTING)
 };

 export const FollowUser = (params) => {
    return axios.post(API.FOLLOW_USER , params)
 };

 export const UnFollowUser = (params) => {
    return axios.post(API.UNFOLLOW_USER , params)
 };


 






