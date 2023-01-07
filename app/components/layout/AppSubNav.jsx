// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';

// Animation
import { Motion, spring } from 'react-motion';

const springConfig = {
  stiffness: 350,
  damping: 18,
  precision: 0.01,
};

const setMarginValue = activeTab => {
  const multiplier = 100 / allTabs.length;
  const activeTabIndex = findIndex(allTabs, { name: activeTab });
  return activeTabIndex * multiplier;
};

const allTabs = [
  {
    title: 'PaidRequests',
    name: 'paid',
    icon: 'ion-card'
  },
  {
    title: 'UnpaidRequests',
    name: 'unpaid',
    icon: 'ion-cash',
  },
];

// Styles
import styled from 'styled-components';

export const SideBar = styled.div`
  flex: 1;
  position:fixed;
  margin-top:50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  background: #292b2c;
`;

export const Tab = styled.a`
  position: relative;
  color: white;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1.5;
  text-decoration: none;
  height: 60px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const Icon = styled.i`
  ${props => props.id === 'paid' && `color: #6bbb69;`};
  ${props => props.id === 'unpaid' && `color: #469fe5;`};
`;

export const ActiveIndicator = styled.div`
  height: ${allTabs.length * 60}px;
  width: 5px;
  position: absolute;
  > div {
    position: absolute;
    background: #2c323a;
    width: 80px;
  }
`;
function AppSubNav({activeSubTab,changeSubTab}){

    const marginTopValue = setMarginValue(activeSubTab);
  const allTabsComponent = allTabs.map(tab => (
    <Tab key={tab.name} href="#" onClick={() => changeSubTab(tab.name)}>
      <Icon id={tab.name} className={tab.icon} />
    </Tab>
  ));
    return (
        <SideBar>
      <div>
        <Motion style={{ marginTop: spring(marginTopValue, springConfig) }}>
          {({ marginTop }) => (
            <ActiveIndicator>
              <div
                style={{
                  height: `${100 / allTabs.length}%`,
                  top: `${marginTop}%`,
                }}
              />
            </ActiveIndicator>
          )}
        </Motion>
        {allTabsComponent}
      </div>
    </SideBar>
    );
}

AppSubNav.propTypes = {
    activeSubTab : PropTypes.string.isRequired,
    changeSubTab : PropTypes.func.isRequired,
}

export default AppSubNav;