const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;
import * as ACTION_TYPES from '../constants/actions.jsx';
import firebase from 'firebase/app'
const SHOP_ID='9FjYdV3HfnnbzFaSwQCW';
const RequestsMW = ({dispatch,getState}) => next =>action => {
    const firestore = firebase.firestore();
    switch(action.type){
        case ACTION_TYPES.REQUEST_DELETE: {
           firestore.collection('shops').doc(SHOP_ID).collection('forms').doc(action.payload.requestId).delete().then(()=>{
                next({
                    type: ACTION_TYPES.REQUEST_DELETE,
                    payload: action.payload,
                  });
                  dispatch({
                    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                    payload: {
                      type: 'success',
                      message: 'Request deleted',
                    },
                  });

                  firestore.collection('users').doc(action.payload.uid).collection('orders').doc(action.payload.requestId).update({
                      status: 'rejected'
                  }).then(()=>{
                    console.log('Successfully updated state');
                  }).catch((err)=>{
                    console.log('Error occured: '+err)
                  })
            }).catch((err)=>{
                next({
                    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                    payload: {
                      type: 'warning',
                      message: err,
                    },
                  });
            });
            break;
        }
        case ACTION_TYPES.REQUEST_SET_STATUS:{
          firestore.collection('shops').doc(SHOP_ID).collection('forms').doc(action.payload.requestId).update({
            status: action.payload.status
          }).then(()=>{
            console.log('Successfully updated shop state');

            firestore.collection('users').doc(action.payload.uid).collection('orders').doc(action.payload.requestId).update({
              status: action.payload.status
          }).then(()=>{
            console.log('Successfully updated user state');
          }).catch((err)=>{
            console.log('Error occured: '+err)
          })

          }).catch((err)=>{
            console.log('Error occured: '+err)
          })

          
        break;
        }

          default: {
            return next(action);
          }
    }
};

export default RequestsMW;