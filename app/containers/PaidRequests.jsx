import React, { PureComponent } from 'react'

import Message from '../components/shared/Message';
import Request from "../components/requests/Request";

export default class PaidRequests extends PureComponent {
    render() {

        const {requests}=this.props;

        return (
            <div>
            {requests.length === 0 ? (
                <Message info text='No Paid Requests' />
              ) : (
                <div className="row">
                 <Request id={requests[0].id} request={requests[0]} status={'pending'}/>
                </div>
              )}

            </div>
             
        )
    }
}
