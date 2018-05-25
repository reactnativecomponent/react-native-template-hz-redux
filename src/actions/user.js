import { createAction } from 'redux-actions'
import * as types from '../constants/ActionTypes'

export const login = createAction(
  types.LOGIN,
  async ({ mobile, password }) => ({
    mobile,
    password,
  }),
  ({ mobile }, resolved) => ({
    mobile,
    resolved,
  }),
)
