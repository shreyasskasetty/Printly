import * as ACTION_TYPES from '../constants/actions';
import {createAction} from 'redux-actions'

export const deleteRequest = createAction(
    ACTION_TYPES.REQUEST_DELETE,
    (requestId,uid) => ({requestId,uid}),
);

export const setRequestStatus = createAction(
    ACTION_TYPES.REQUEST_SET_STATUS,
    (requestId,uid,status)=>({requestId,uid,status}),
)