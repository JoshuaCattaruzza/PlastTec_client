import axios from 'axios';

const endpoints = ['https://b96a-95-241-205-166.ngrok.io/api/task/','https://api.joshuacattaruzza.com/api/machine/'];
const getData = () => { 
	return axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};