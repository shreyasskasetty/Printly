// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store';
import {createFirestoreInstance} from 'redux-firestore'
import {  ReactReduxFirebaseProvider} from 'react-redux-firebase';
import 'firebase/auth'
import 'firebase/firestore'
import firebase from './helpers/firebase'
// Root Component
import App from './App';
import ErrorBoundary from './components/shared/ErrorBoundary';
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
// Store
const store = configureStore();
firebase.firestore()
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
// Render
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <AppContainer>
          <ErrorBoundary>
          
            <App />
         
          </ErrorBoundary>
        </AppContainer>
        </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
