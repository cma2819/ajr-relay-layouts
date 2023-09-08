import React from 'react';
import styled from 'styled-components';
import { CurrentCp } from '../../../../nodecg/replicants';
import { useReplicant } from '../../../hooks/nodecg'
import { ShowCurrent } from './ShowCurrent';

const Container = styled.div<{
    teams: number
}>`
    width: 100%;
    display: grid;
    grid-template-columns: ${props => `repeat(${props.teams}, auto)`};
`;

type CurrentCheckpointAttached = CurrentCp & {
    teams: number[],
};

export const CurrentCheckpoint = () => {
  const currentCheckpoint = useReplicant('current-checkpoints');

  const cpsTeamAttached = currentCheckpoint.reduce((prev, current, tIndex) => {
    const sameCpIndex = prev.findIndex(p => p.diffCpCount === current.diffCpCount);
    if (sameCpIndex < 0) {
      return [
        ...prev,
        {
          ...current,
          teams: [tIndex]
        }
      ]
    }
    const same = prev[sameCpIndex];
    return [
      ... prev.slice(0, sameCpIndex),
      {
        ... same,
        teams: [
          ... same.teams,
          tIndex
        ]
      },
      ... prev.slice(sameCpIndex + 1),
    ]
  }, [] as CurrentCheckpointAttached[]).sort((a, b) => a.diffCpCount - b.diffCpCount);

  return (
    <Container teams={cpsTeamAttached.length}>
      { cpsTeamAttached.map(current => (
        <div key={current.diffCpCount}>
          <ShowCurrent teamIndex={current.teams} current={current} />
        </div>
      ))}
    </Container>
  )
}