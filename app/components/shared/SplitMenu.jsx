// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > a {
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    // align-items: center;
    padding: 4px 0;
    font-size: 12px;
    text-decoration: none;
    background: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    &:first-child {
      border-radius: 4px 0 0 4px;
      padding: 4px 12px;
      text-align: left;
      justify-content: flext-start;
      // align-items: flext-start;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
      max-width: 24px;
    }
  }
`;

const Addon = styled.div`
  &:before {
    content: ' ';
    height: 10px;
    width: 10px;
    position: absolute;
    top: -6px;
    right: 10px;
    transform: rotate(45deg);
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 42px;
  width: 100%;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: +999;
  a {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 6px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: black;
    width: 100%;
    text-align: left;
    z-index: 10;
    &:hover {
      text-decoration: none;
      background: #f9fafa;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

class SplitMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showOptions: false,};
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showOptions !== nextState.showOptions) {
      return true;
    }
    return false;
  }

  handleClick(e) {
    if (!this.state.showOptions) {
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
      this.setState({ showOptions: !this.state.showOptions});
  }

  handleOutsideClick(e) {
    this.handleClick();
  }

  renderListItems() {
    const { options } = this.props;
    return options.map(option => (
      <a
        key={option.name.toString()}
        name={option.name.toString()}
        href="#"
        onClick={(event) => {
          option.action(option.name.toString());
          this.handleClick()
       
        }}
      >
        {option.name}
      </a>
    ));
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        <Wrapper>
          <ButtonsGroup>
            <a >
              {this.props.value?this.props.value:'Select Printer'}
            </a>
            {this.props.status !=='printing'
            ?
            <a href="#" onClick={this.handleClick}>
              <i className="ion-arrow-down-b" />
            </a>:<a></a>
            }
          </ButtonsGroup>
          {this.state.showOptions && <Addon>{this.renderListItems()}</Addon>}
        </Wrapper>
      </div>
    );
  }
}

SplitMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default SplitMenu;
