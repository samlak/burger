import axios from 'axios';

const instance  = axios.create({
    baseURL: 'https://burger-order-a9b02.firebaseio.com/'
});

export default instance;