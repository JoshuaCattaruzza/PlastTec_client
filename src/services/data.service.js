import axios from 'axios';

const endpoints = ['http://192.168.1.18:4201/api/task/','http://192.168.1.18:4201/api/machine/'];
const getData = () => { 
	return axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};