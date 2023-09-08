import '../common.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { GraphicsApp } from '../components/GraphicsApp';
import Background from '../resources/background.png';
import styled from 'styled-components';
import { CommentatorList } from '../components/CommentatorList';
import { ViewCard } from '../components/ViewCard';
import { SwitchView } from '../components/SwitchView';
import { RectPath } from '../components/AppBackground';
import { TeamLogo } from '../components/TeamLogo';
import { ViewFrame } from '../components/ViewFrame';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 96px 864px 864px 96px;
  grid-template-rows: 486px 126px 360px;
`;

const LeftVideoContainer = styled.div`
  padding: 8px 16px 8px 8px;
`;

const RightVideoContainer = styled.div`
  padding: 8px 8px 8px 16px;
`;

const ThirdVideo = styled(LeftVideoContainer)`
  padding-top: 4px;
  padding-bottom: 12px;
  grid-column: 2 / 3;
  grid-row: 2 / 4;
`

const CommentatorCard = styled(ViewCard)`
  font-size: 32px;
  margin: 8px;
  grid-column: 3 / 5;
  grid-row: 2 / 3;
`;

const SwitchViewCard = styled(ViewCard)`
  margin: 8px;
  grid-column: 3 / 5;
  grid-row: 3 / 4;
`;

const gameViewSize = {
  h: 474,
  w: 842,
}

const clips: RectPath[] = [
  {
    ...gameViewSize,
    x: 106,
    y: 8
  },
  {
    ...gameViewSize,
    x: 976,
    y: 8,
  },
  {
    ...gameViewSize,
    x: 106,
    y: 494,
  },
]

const App = () => {
  return (
    <GraphicsApp backgroundImage={Background} width={1920} height={972} clipPaths={clips} >
      <Container>
        <TeamLogo index={0} width={96} height={486} />
        <LeftVideoContainer>
          <ViewFrame team={0} />
        </LeftVideoContainer>
        <RightVideoContainer>
          <ViewFrame team={1} />
        </RightVideoContainer>
        <TeamLogo index={1} width={96} height={486} reverse />
        <TeamLogo index={2} width={96} height={486} />
        <ThirdVideo>
          <ViewFrame team={2} />
        </ThirdVideo>
        <CommentatorCard>
          <CommentatorList />
        </CommentatorCard>
        <SwitchViewCard>
          <SwitchView />
        </SwitchViewCard>
      </Container>
    </GraphicsApp>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));