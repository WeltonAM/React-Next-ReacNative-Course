import axios from 'axios';
import { BASE_URL } from '@env';

console.log(BASE_URL);

const api = axios.create({
    baseURL: 'http://192.168.0.151:3333'
});

export { api };