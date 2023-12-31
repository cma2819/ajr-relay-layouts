import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useReplicant } from '../../../hooks/nodecg';
import { ProgressContent } from './ProgressContent';
import { ProgressHeader } from './ProgressHeader';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 20% 2px auto;
    grid-gap: 8px;
`;

const HeaderContainer = styled.div`
    align-self: center;
    text-align: center;
    font-size: 26px;
`;

const Border = styled.div`
    background-color: #ffffff;
    margin: 8px 0;
`;

const ViewTypes = ['current', 'latest'] as const
export type ViewType = typeof ViewTypes[number];

const SWITCH_VIEW_INTERVAL = 180_000;

export const ProgressView = () => {
  const [ type, setType ] = useState<ViewType>('current');

  const latest = useReplicant('latest-checkpoints');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!latest) {
        setType('current');
        return;
      }
      const nowIndex = ViewTypes.indexOf(type);
      const next = ViewTypes[nowIndex + 1] ?? ViewTypes[0];
      setType(next);
    }, SWITCH_VIEW_INTERVAL);

    return () => {
      clearInterval(intervalId);
    }
  }, [latest, type]);

  return (
    <Container>
      <HeaderContainer>
        <ProgressHeader type={type} />
      </HeaderContainer>
      <Border />
      <ProgressContent type={type} />
    </Container>
  )
}