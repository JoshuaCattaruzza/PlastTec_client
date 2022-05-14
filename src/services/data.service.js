import axios from 'axios';

const endpoints = ['http://api.joshuacattaruzza.com/api/task/','http://api.joshuacattaruzza.com/api/machine/'];
const getData = () => { 
	return axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};