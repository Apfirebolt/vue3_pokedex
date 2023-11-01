import axios from 'axios';

let baseURL = 'https://pokeapi.co';

const httpClient = axios.create({ baseURL });

export default httpClient;