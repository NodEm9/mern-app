import axios from "axios";

const instance = axios.create({
  baseURL: 'http://172.104.246.147:5000/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export default instance;