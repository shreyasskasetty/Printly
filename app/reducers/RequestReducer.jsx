import { handleActions, combineActions } from 'redux-actions';
import * as Actions from '../actions/requests';

const RequestReducer = handleActions(
  {
    [combineActions(
      Actions.deleteRequest,
      Actions.setRequestStatus,
    )]: (state, action) => action.payload,

  },
  []
);

export default RequestReducer;