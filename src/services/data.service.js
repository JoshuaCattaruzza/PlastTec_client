import axios from 'axios';

const url = 'http://localhost:4201/task/';

const getData = () => { 
	return axios.get(url);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};