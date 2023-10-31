import axios from 'axios';

let baseURL = 'https://www.episodate.com/api/';

const httpClient = axios.create({ baseURL });

export default httpClient;