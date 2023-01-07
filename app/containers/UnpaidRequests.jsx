import React, { PureComponent } from 'react'
import {
    PageContent,
  } from '../components/shared/Layout';
import Message from '../components/shared/Message';
import Request from "../components/requests/Request";
export class UnpaidRequests extends PureComponent {
    render() {

        const {requests,deleteRequest,setRequestStatus,setShowModal,printers}=this.props;
        const allComponents =requests.map((request,index )=> ( 
        <Request 
        key = {request.id} 
        deleteRequest={(requestId,uid)=>{deleteRequest(requestId,uid)}}
        setRequestStatus={setRequestStatus}
        printers={printers}
        notify={this.props.notify}
        id ={request.id}
        request={request} 
        status={request.status}
        setShowModal={setShowModal}
        />));
        return (
            <div>
            {
            requests.length === 0 ? (
                <Message info text='No Paid Requests' />
              ) :
                <div className="row">
                 {allComponents}
                </div>
              
              
            
            }

            </div>
            
        )
    }
}
export default UnpaidRequests;