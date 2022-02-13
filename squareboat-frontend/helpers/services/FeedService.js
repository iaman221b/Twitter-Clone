import axios from 'axios';
import API from '../API/index';

if(typeof(localStorage) != 'undefined'){

    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

}



export const FeedListing = (params) => {
   return axios.get(API.FEEDS, params)
};

export const CreateFeed = (params) => {
    return axios.post(API.FEEDS, params)
 };








