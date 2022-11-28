import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.funtranslations.com/translate/minion.json/'
});

export default api;