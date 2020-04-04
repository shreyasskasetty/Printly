import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/requests';

const RequestsReducer = handleActions(
    {
        [combineActions(
            Actions.deleteRequest,
            Actions.getRequests,
            Actions.printRequest,
            Actions.setRequestStatus
        )]:(state,action)=>action.payload
    },
    []
);

export default RequestsReducer;
const getRequestsState = state => state.requests;
export const getRequests= createSelector(
  getRequestsState,
  requests => requests
);
