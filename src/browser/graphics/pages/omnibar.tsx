import '../common.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { GraphicsApp } from '../components/GraphicsApp';
import Background from '../resources/bk_bar.png';
import styled from 'styled-components';
import { EventLogo } from '../components/EventLogo';
import { Timer } from '../components/Timer';
import { ProgressView } from '../components/ProgressView';

const OmnibarContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.6); */
    display: grid;
    grid-template-columns: auto 2px 15% 10%;
    align-items: center;
`;

const EventLogoContainer = styled.div`
    padding: 8px;
    align-self: stretch;
`;

const TimerContainer = styled.div`
    font-size: 46px;
    text-align: center;
`

const Border = styled.div`
    background-color: #ffffff;
    margin: 8px 0;
    align-self: stretch;
`;

const App = () => {
  return (
    <GraphicsApp backgroundImage={Background} width={1920} height={108}>
      <OmnibarContainer>
        <ProgressView />
        <Border />
        <TimerContainer>
          <Timer />
        </TimerContainer>
        <EventLogoContainer>
          <EventLogo />
        </EventLogoContainer>
      </OmnibarContainer>
    </GraphicsApp>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));