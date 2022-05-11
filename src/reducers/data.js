import { FETCH_DATA } from '../actions/types';

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;;
	switch (type) {
		case FETCH_DATA:
			return { ...state,
				tasks: payload[0].data, machines: payload[1].data };

		default:
			return state;
	}
}
