import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { useReplicant, useTeams } from '../../../hooks/nodecg';

type ViewFrameProps = {
    team: number;
}

const Container = styled.div<{color: string}>`
    width: 100%;
    height: 100%;
    border: 4px solid ${props => props.color};
    display: grid;
    grid-template-columns: auto 1fr 64px;
    grid-template-rows: 70% 30%;
    align-items: center;
`;

const Panel = styled.div<{ color: string }>`
    background-color: ${props => props.color};
`;

const NamePanel = styled(Panel)`
    padding: 8px 16px;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
`;

const AudioPanel = styled(Panel)`
    padding: 16px;
    grid-column: 3 / 4;
    grid-row: 2 / 3;
`;

export const ViewFrame = ({team: teamIndex}: ViewFrameProps) => {
  const current = useReplicant('current-checkpoints');
  const teams = useTeams();
  const team = teams?.[teamIndex];
  const runner = team.members?.[current?.[teamIndex]?.game];

  const audioAssign = useReplicant('audio-assign');
  const onAudio = audioAssign.includes(teamIndex);

  return (
    <Container color={team.color}>
      <NamePanel color={team.color}>
        { runner?.name }
      </NamePanel>
      {
        onAudio && (
          <AudioPanel color={team.color}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </AudioPanel>
        )
      }
    </Container>
  )
}