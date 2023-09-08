import { LatestCheckpoint, LatestCpSegment } from '../../../../nodecg/replicants';
import styled from 'styled-components';
import React from 'react';
import { RunnerIcon } from '../RunnerIcon';
import moment from 'moment';
import { CSSTransition, SwitchTransition } from 'react-transition-group';


export type ShowLatestProps = {
    team: number;
    latest: LatestCheckpoint;
    segment: LatestCpSegment;
    showDiff: boolean;
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 88px auto;
    height: 100%;
`;

const CheckpointPlate = styled.span`
    width: 180px;
    color: #222222;
    background-color: #ffffff;
    border-radius: 8px;
    justify-self: start;
    align-self: end;
    margin: 16px 16px 16px 0px;
    padding: 8px 24px;
`;

const diffLabel = (latest: LatestCheckpoint): string => {
  if (latest.rank === 1) {
    return 'トップとの差';
  }

  const diffDuration = moment.duration(latest.diffInSeconds, 'seconds');
  return `+${String(Math.floor(diffDuration.asMinutes())).padStart(2, '0')}:${String(diffDuration.seconds()).padStart(2, '0')}`
}

export const ShowLatest = ({team, latest, segment, showDiff}: ShowLatestProps) => {

  return (
    <Container>
      <RunnerIcon gameIndex={segment.game} teamIndex={team} />
      <CheckpointPlate>
        
        <SwitchTransition>
          <CSSTransition
            key={String(showDiff)}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames='fade'
          >
            <span>
              {
                !showDiff && latest.time
              }
              { showDiff && diffLabel(latest) }
            </span>
          </CSSTransition>
        </SwitchTransition>
      </CheckpointPlate>
    </Container>
  )
}