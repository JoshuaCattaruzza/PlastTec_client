import axios from 'axios';

const endpoints = ['https://api.joshuacattaruzza.com/api/task/','https://api.joshuacattaruzza.com/api/machine/'];
const getData = () => { 
	return axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};