import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
const ipc = require('electron').ipcRenderer;
import * as ACTION_TYPES from '../../constants/actions'
// Custom Components
import Button from '../shared/Button';
import SplitMenu from '../shared/SplitMenu';
//Request Container
const Wrapper = styled.div`
  position: relative;
  min-width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  margin-left:30px;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Invoice Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
`;

const StatusBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 4px 4px 0 0;
  ${props => props.status === 'pending' && `background: #469FE5;`} ${props =>
      props.status === 'printing' && `background: #fcba03;`}  ${props =>
       props.status === 'finished' && `background: #6BBB69;`}${props =>
      props.status === 'refunded' && `background: #4F555C;`} ${props =>
      props.status === 'cancelled' && `background: #EC476E;`};
`;

const Status = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props => props.status === 'pending' && `color: #469FE5;`} ${props =>
    props.status === 'printing' && `color: #fcba03;`}  ${props =>
     props.status === 'finished' && `color: #6BBB69;`}${props =>
      props.status === 'cancelled' && `color: #EC476E;`} span {
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
    }
  }
  i.ion-checkmark {
    font-size: 16px;
    line-height: 16px;
  }
  i.ion-loop {
    font-size: 18px;
    line-height: 18px;
  }
  i.ion-backspace {
    font-size: 18px;
    line-height: 18px;
  }
  i.ion-ios-printer {
    font-size: 18px;
    line-height: 18px;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  i {
    margin-left: 10px;
    color: #B4B7BA;
  }
  i.ion-trash-a {
    font-size: 24px;
    line-height: 24px;
    &:hover {
      color: #EC476E;
    }
  }
  i.ion-ios-copy {
    font-size: 24px;
    line-height: 24px;
    &:hover {
      color: #469FE5;
    }
  }
}
`;

// Invoice Body
const Body = styled.div`
  padding: 0 30px;
`;

// Invoice Footer
const Footer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    flex: 1;
    margin: 0 10px;
    &:first-child {
      flex: 3;
    }
  }
`;

// Shared Style
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Field = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 15px;
  text-transform: capitalize;
  h2 {
    font-size: 21px;
    color: #283641;
    margin-bottom: 0;
    font-weight: 500;
  }
  label {
    font-size: 11px;
    color: #b4b7ba;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
    font-weight: 400;
  }
  p {
    font-weight: 300;
    margin-bottom: 0px;
    font-size: 14px;
  }
`;
export class Request extends PureComponent {
    constructor(props){
        super(props);
        this.state={
          printername: this.props.printers?this.props.printers[0].name:null,
        }
        this.viewPrintPreview=this.viewPrintPreview.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
        this.displayStatus = this.displayStatus.bind(this);
        this.openDialogBox = this.openDialogBox.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.setRequestStatus = this.setRequestStatus.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.viewMessage = this.viewMessage.bind(this);
        this.setPrinter = this.setPrinter.bind(this);
        this.getPrinters = this.getPrinters.bind(this);
    }
    setRequestStatus(status){
     const  {request,setRequestStatus}=this.props;
      setRequestStatus(request.id,request.uid,status);
    }
    deleteRequest(){
      const { request, deleteRequest } = this.props;
      deleteRequest(request.id,request.uid)
    }
    viewPrintPreview(){

    }
    viewMessage(){
     const  {request,setShowModal}= this.props;
      setShowModal(request.extraComment);
    }
    openDialogBox(){

    }
    setPrinter(printer){
      this.setState({printername:printer})
    }
    acceptRequest(){
      const {request,notify}=this.props;
      ipc.send('download-file',request.download_url);
      ipc.on('download-complete',()=>{
        console.log('download complete');
        const message='file download completed!';
        let srcFilename = request.download_url.split('/')[1];
        console.log(srcFilename);
        ipc.send('print',{printerName:this.state.printername,filename:srcFilename});
        ipc.on('status',(event,status)=>{
          this.setRequestStatus(status);   
        });
        ipc.on('error',(event,err)=>{
          notify('Error occured: '+err+'\nPlease try again!','warning');
        })
        notify(message,'success');
        
      });
      ipc.on('download-failed',(event,err)=>{
        console.log(err);
        notify(err,'warning');
      })
    }
    
    cancelRequest(){
      const  {request,setRequestStatus}=this.props;
      setRequestStatus(request.id,request.uid,'cancelled');
    }
    getPrinters(){
        const {printers} = this.props;
        console.log(printers);
        const modified_printers = printers?printers.map((printer)=>({
          ...printer,
          action:(printerName)=>{this.setPrinter(printerName);}
        })):null
        return modified_printers;
    }
    displayStatus(){
    
    const { status } = this.props;
    switch (status) {
      case 'cancelled': {
        return (
          <span>
            <i className="ion-backspace" />
            cancelled
          </span>
        );
      }
      case 'finished': {
        return (
          <span>
            <i className="ion-checkmark" />
            finished
          </span>
        );
      }
      case 'refunded': {
        return (
          <span>
            <i className="ion-arrow-return-left" />
            refunded
          </span>
        );
      }
      case 'printing':{
          return( <span>
        <i className="ion-ios-printer" />
            printing
          </span>);
      }
      default: {
        return (
          <span>
            <i className="ion-loop" />
            pending
          </span>
        );
      }
    }
    }
    render() {
      console.log(this.state.printername)
          const {status,request,id} = this.props;
        return (
            <div className="col-lg-6">
        <Wrapper>
          <StatusBar status={status} />
          <Header>
            <Status status={status}>{this.displayStatus()}</Status>
            <ButtonsGroup>
              <Button link onClick={this.viewPrintPreview}>
                <i className="ion-ios-copy" />
              </Button>
              <Button link onClick={this.deleteRequest}>
                <i className="ion-trash-a" />
              </Button>
            </ButtonsGroup>
          </Header>
          <Body>
            <Row>
              <Field>
                <label>Client</label>
                <h2>{id}</h2>
              </Field>
            </Row>
            <Row>
              <Field>
                <label>Order ID</label>
                <p>
                  {id}
                </p>
              </Field>
              <Field>
                <label>Price</label>
                <p>
                  100
                </p>
              </Field>
            </Row>
            <Row>
              <Field>
                <label>Time Stamp</label>
                <p>{'1976-04-19T12:59-0500'}</p>
              </Field>
              <Field>
                <label>Type of Print</label>
                <p>
                  {request.ink==='BLACK_WHITE' && 'Black & White'}
                  {request.ink==='COLOR' && 'Color'}
                </p>
              </Field>
            </Row>
          </Body>
          <Footer>
            {status !=='cancelled' && this.getPrinters()?<SplitMenu
                status={status}
                 options={this.getPrinters()}
                 value={this.state.printername}
            />:null}
            <Button onClick={this.viewMessage}>
             message
            </Button>
           {status ==='printing'?<Button onClick={this.cancelRequest}>
              Cancel
            </Button>: status!== 'cancelled'? <Button onClick={this.acceptRequest}>
              Print
            </Button>:null}
          </Footer>
        </Wrapper>
      </div>
        );
    }
}

export default Request
