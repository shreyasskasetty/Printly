import {createAction} from 'redux-actions'
import * as ACTION_TYPES from '../constants/actions.jsx'

export const getRequests = createAction(ACTION_TYPES.REQUESTS_GET_ALL);

export const printRequest = createAction(
    ACTION_TYPES.REQUESTS_PRINT,
    request_ID=>request_ID
);

export const deleteRequest = createAction(
    ACTION_TYPES.REQUESTS_DELETE,
    request_ID => request_ID
  );

export const setRequestStatus = createAction(
    ACTION_TYPES.REQUEST_SET_STATUS,
    (request_ID, status) => ({ request_ID, status })
  );