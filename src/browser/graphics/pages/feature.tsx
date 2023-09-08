import '../common.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { GraphicsApp } from '../components/GraphicsApp';
import Background from '../resources/background.png';
import styled from 'styled-components';
import { CommentatorList } from '../components/CommentatorList';
import { ViewCard } from '../components/ViewCard';
import { RectPath } from '../components/AppBackground';
import { ViewFrame } from '../components/ViewFrame';
import { TeamLogoNoTransform } from '../components/TeamLogoNoTransform';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 640px 1280px;
  grid-template-rows: 252px 360px 108px 252px;
`;

const SubVideoContainer = styled.div`
  padding: 4px 16px 8px 8px;
`;

const MainVideoContainer = styled.div`
  padding: 8px;
  grid-column: 2 / 3;
  grid-row: 1 / 4;
`;

const FirstSubVideoContainer = styled(SubVideoContainer)`
    grid-column: 1 / 2;
    grid-row: 2 / 3;
`;

const SecondSubVideoContainer = styled(SubVideoContainer)`
    grid-column: 1 / 2;
    grid-row: 3 / 5;
`;

const CommentatorCard = styled(ViewCard)`
  font-size: 32px;
  margin: 16px 8px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const TeamLogoContainer = styled.div`
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    padding: 16px;
`;

const smallViewSize = {
  h: 351,
  w: 624,
}

const clips: RectPath[] = [
  {
    ...smallViewSize,
    x: 8,
    y: 258
  },
  {
    ...smallViewSize,
    x: 8,
    y: 618,
  },
  {
    h: 710,
    w: 1272,
    x: 652,
    y: 8,
  },
]

const App = () => {

  const params = new URLSearchParams(document.location.search);
  const featured = params.has('index') ? Number(params.get('index')) : 0;

  const featureIndex = ([0, 1, 2] as const).find(n => n === featured);
  const subIndexes = [0, 1, 2].filter(index => index !== featureIndex);

  return (
    <GraphicsApp backgroundImage={Background} width={1920} height={972} clipPaths={clips} >
      <Container>
        <CommentatorCard>
          <CommentatorList />
        </CommentatorCard>
        <MainVideoContainer>
          {
            featureIndex !== undefined && (
              <ViewFrame team={featureIndex} />
            )
          }
        </MainVideoContainer>
        <FirstSubVideoContainer>
          <ViewFrame team={subIndexes[0]} />
        </FirstSubVideoContainer>
        <SecondSubVideoContainer>
          <ViewFrame team={subIndexes[1]} />
        </SecondSubVideoContainer>
        <TeamLogoContainer>
          {
            featureIndex !== undefined && (
              <TeamLogoNoTransform index={featureIndex} />
            )
          }
        </TeamLogoContainer>
      </Container>
    </GraphicsApp>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));