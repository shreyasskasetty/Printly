import React, { PureComponent } from 'react'
import Button, { ButtonsGroup } from '../components/shared/Button';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {firestoreConnect,isLoaded} from 'react-redux-firebase'
import {compose} from 'redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as UIActions from '../actions/ui';
import AppSubNav from '../components/layout/AppSubNav'
const ipc = require('electron').ipcRenderer;
import Loading from 'react-loading-animation'
import * as ACTION_TYPES from '../constants/actions'
const openDialog = require('../renderers/dialog.js');
// Actions
import * as Actions from '../actions/requests';
import NetworkDetector from "../Hoc/NetworkDetector";

import {  
  PageContent,
} from '../components/shared/Layout';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
} from '../components/shared/Layout';
import UnpaidRequests from '../containers/UnpaidRequests';
import PaidRequests from '../containers/PaidRequests';
const SHOP_ID='9FjYdV3HfnnbzFaSwQCW';
export class Requests extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { filter: 'pending',loading:true, };
        this.changeSubTab = this.changeSubTab.bind(this);
        this.notify = this.notify.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
        this.setRequestStatus = this.setRequestStatus.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
        this.getPrinters = this.getPrinters.bind(this);
      }
      setShowModal(message){
        if(message==='')message='No extra comments'
        openDialog(
          {
            type: 'info',
            title: 'User Comment',
            message: message,
            buttons: [
              'ok'
            ],
          },
        );
      }
      componentDidMount(){
        this.getPrinters();
      }
      getPrinters(){
      ipc.send('getPrinters');
      ipc.on('printers',(event,printers)=>{

         this.setState({...this.state,printers:printers});
      })
       
      }
      setRequestStatus(requestId,uid,status){
        const { dispatch } = this.props;
        dispatch(Actions.setRequestStatus(requestId,uid,status));
        dispatch({
          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
          payload: {
            type: 'success',
            message: 'Status of request: '+requestId+' is '+status,
          },
        });
      }
      setFilter(event) {
        const currentFilter = this.state.filter;
        const newFilter = event.target.dataset.filter;
        console.log(newFilter);
        this.setState({ filter: currentFilter === newFilter ? null:newFilter });
        
      }
      deleteRequest(requestId,uid){
        const { dispatch } = this.props;
        if(navigator.onLine)
        dispatch(Actions.deleteRequest(requestId,uid));
        else
        {
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: 'Offline',
            },
          });
        }
      }
     
      changeSubTab(tabName) {
        const { dispatch } = this.props;
        dispatch(UIActions.changeActiveSubTab(tabName));
      }

      notify(message,type){
        const {dispatch} = this.props;
        dispatch({
          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
          payload: {
            type: type,
            message: message,
          },
        });
      }

    render() {
        const { activeSubTab } = this.props.ui;
        const { requests} =this.props;
        const unpaidRequests = requests? requests.filter(request => request.paymentMode === 'COD'):[];
        console.log(unpaidRequests);
        const paidRequests = requests?requests.filter(request => request.paymentMode === 'paid'):[];
        const { filter } = this.state;
        const unpaidFilteredRequests = filter ? unpaidRequests.filter(request => request.status === filter) : [];
        const paidFilteredRequests = filter ? paidRequests.filter(request => request.status === 'all') : [];
        const statuses = ['pending' ,'printing',  'cancelled','refunded','finished'];
        const filterButtons = statuses.map(status => (
          activeSubTab==='unpaid' && status==='refunded'?null:<Button
            key={`${status}-button`}
            active={filter === status}
            data-filter={status}
            onClick={this.setFilter}
          >
            {status}
          </Button>
        ));

        return (
          
                <PageWrapper>

                  <AppSubNav activeSubTab={activeSubTab} changeSubTab={this.changeSubTab} />
                  <PageHeader subnav >
                            <PageHeaderTitle>Print Requests</PageHeaderTitle>
                            <PageHeaderActions>
                                <i className="ion-funnel" />
                                <ButtonsGroup>{ filterButtons }</ButtonsGroup>
                            </PageHeaderActions>
                  </PageHeader>
             {isLoaded(requests)? <PageContent bare subnav>
          {activeSubTab === 'unpaid' && <UnpaidRequests requests={unpaidFilteredRequests} 
          setShowModal={this.setShowModal} 
          setRequestStatus={this.setRequestStatus}
           notify={this.notify} 
           printers={this.state.printers}
           deleteRequest={this.deleteRequest}/>}
          {activeSubTab === 'paid' && <PaidRequests requests={paidRequests} deleteRequest={this.deleteRequest} />}
         </PageContent>:<PageContent bare subnav><Loading /></PageContent>}
                
                </PageWrapper>
        )
    }
}

Requests.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    activeSubTab: PropTypes.string.isRequired,
  })
}
const mapStateToProps =(state,props)=> {
  return {
    ui:state.ui,
    requests: state.firestore.ordered.requests,
  }
}

export default compose(
  firestoreConnect(props => {
    return [{collection: "shops", doc:SHOP_ID, subcollections: [{ collection: "forms" }], storeAs: 'requests' }];
  }),
  connect(mapStateToProps),
  NetworkDetector,
)(Requests);