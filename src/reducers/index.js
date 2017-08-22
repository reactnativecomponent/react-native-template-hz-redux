import { combineReducers } from 'redux';
import utils from './utils';
import user from './user';
import nav from './nav';
export default combineReducers({
    utils,
	user,
    nav
});
