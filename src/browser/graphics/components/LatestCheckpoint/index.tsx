import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReplicant } from '../../../hooks/nodecg'
import { ShowLatest } from './ShowLatest';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const LatestCheckpoint = () => {
  const latestCheckpoint = useReplicant('latest-checkpoints');

  const sortedLatest = (latestCheckpoint?.times ?? []).map((time, tIndex) => ({
    ... time,
    team: tIndex,
  })).sort((a, b) => a.rank - b.rank);

  const [ showDiff, setShowDiff ] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDiff(true);
    }, 30_000)
  }, [])

  return (
    <Container>
      { latestCheckpoint && sortedLatest.map((latest, index) => (
        <ShowLatest key={index} team={latest.team} latest={latest} segment={latestCheckpoint.segment} showDiff={showDiff} />
      ))}
    </Container>
  )
}