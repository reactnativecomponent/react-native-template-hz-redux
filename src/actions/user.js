import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
export const login = createAction(
    types.LOGIN,
    async({mobile,password})=> {
        return {
            mobile,
            password
        }
    }, ({mobile}, resolved)=> {
        return {
            mobile,
            resolved: resolved
        }
    });