import React, { Component } from 'react';
import styled from 'styled-components';
import * as ACTION_TYPES from '../constants/actions'
import "firebase/performance";
const styleddiv = styled.div`
height: 60px;
background: #ff8100;
margin-top: 0;
font-size: 20px;
`;
const styledp = styled.p`
    font-size: 25px;
    line-height: 60px;
    color: #fff;
    margin: 0;
`;
export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('http://google.com', {
              mode: 'no-cors',
              })
            .then(() => {
                console.log('connected');
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          { isDisconnected && (<styleddiv className="internet-error">
              <styledp>Internet connection lost</styledp>
            </styleddiv>)
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}