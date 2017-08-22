import * as types from '../constants/ActionTypes';
const initialState = {
	toast: {
		text: null,
		timeout: 2000,
		id: null
	},
	tokenInvalid:{
		id:null,
		isInvalid:false,
	}
};


export default function (state = initialState, action) {
	const { payload ={} } = action;
	switch (action.type) {
		case types.TOAST:
			return {
				...state,
				toast: {
					...state.toast,
					...payload
				}
			};
		case types.INVALID_TOKEN:
			return {
				...state,
				tokenInvalid: {
					...state.tokenInvalid,
					...payload
				}
			};
		default :
			return state;
	}
}
