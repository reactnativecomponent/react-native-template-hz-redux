import { createAction } from 'redux-actions'
import * as types from '../constants/ActionTypes'

export const toast = createAction(types.TOAST, (text, timeout) => ({
  text,
  timeout,
  id: new Date().getTime(),
}))
export const invalidToken = createAction(types.INVALID_TOKEN, () => ({
  isInvalid: true,
  id: new Date().getTime(),
}))
