import uuidv4 from 'uuid/v4';
import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;
import i18n from '../../i18n/i18n';

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';
import * as FormActions from '../actions/form';

// Helpers
import { getInvoiceValue } from '../helpers/invoice';
import { getAllDocs, getSingleDoc, saveDoc, deleteDoc, updateDoc } from '../helpers/pouchDB';

const RequestsMW = ({dispatch,getState})=>next=>action=>{
    switch(action.type){
        case ACTION_TYPES.REQUESTS_GET_ALL: {
        return getAllDocs('requests')
        .then(allDocs => {
          next(
            Object.assign({}, action, {
              payload: allDocs,
            })
          );
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
        }
        case ACTION_TYPES.REQUESTS_DELETE: {
            return deleteDoc('requests', action.payload)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.INVOICE_DELETE,
            payload: remainingDocs,
          });
          // Send Notification
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:invoice:deleted'),
            },
          });
        });
        }

        // case ACTION_TYPES.INVOICE_SET_STATUS: {
        //     const { requestID, status } = action.payload;
        //     return getSingleDoc('requests', requestID)
        //       .then(doc => {
        //         dispatch({
        //           type: ACTION_TYPES.INVOICE_UPDATE,
        //           payload: Object.assign({}, doc, { status })
        //         })
        //       })
        //       .catch(err => {
        //         next({
        //           type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        //           payload: {
        //             type: 'warning',
        //             message: err.message,
        //           },
        //         });
        //       });
        //   }
      
          default: {
            return next(action);
          }
    }
}