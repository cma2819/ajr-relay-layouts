import { CurrentCp } from '../../../../nodecg/replicants';
import styled from 'styled-components';
import React from 'react';
import { RunnerIcon } from '../RunnerIcon';


export type ShowCurrentProps = {
    teamIndex: number[];
    current: CurrentCp;
};

const Container = styled.div<{
    teams: number
}>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.teams}, 88px)`} auto;
    height: 100%;
`;

const CheckpointPlate = styled.span`
    width: 216px;
    color: #222222;
    background-color: #ffffff;
    border-radius: 8px;
    justify-self: start;
    align-self: end;
    margin: 16px 16px 16px 0px;
    padding: 8px 24px;
`;

export const ShowCurrent = ({teamIndex, current}: ShowCurrentProps) => {

  return (
    <Container teams={teamIndex.length}>
      {teamIndex.map((team, index) => (
        <RunnerIcon key={index} gameIndex={current.game} teamIndex={team} top={current.diffCpCount === 0} />
      ))}
      <CheckpointPlate>
        { current.label }
      </CheckpointPlate>
    </Container>
  )
}