import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
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

const DoneTimePanel = styled(Panel)`
  font-size: 42px;
  padding: 8px 16px;
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  align-self: start;
  text-align: center;
`;

const NamePanel = styled(Panel)`
    padding: 8px 16px;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
`;

const StreamSpan = styled.span`
  padding: 0px 8px;
`;

const AudioPanel = styled(Panel)`
    padding: 16px;
    grid-column: 3 / 4;
    grid-row: 2 / 3;
`;

export const ViewFrame = ({team: teamIndex}: ViewFrameProps) => {
  const currents = useReplicant('current-checkpoints');
  const totals = useReplicant('total-times');
  const teams = useTeams();
  const team = teams?.[teamIndex];
  const runner = team.members?.[currents?.[teamIndex]?.game];

  const audioAssign = useReplicant('audio-assign');
  const onAudio = audioAssign.includes(teamIndex);

  const isDone = currents?.[teamIndex]?.isDone;
  const [lastGameTotals] = totals.slice(-1)
  const lastTime = lastGameTotals?.[teamIndex];

  return (
    <Container color={team.color}>
      <NamePanel color={team.color}>
        { runner?.name }
        <StreamSpan>
          {
            runner?.stream.platform === 'twitch' && (
              <FontAwesomeIcon icon={faTwitch} />
            )
          }
          {
            runner?.stream.platform === 'youtube' && (
              <FontAwesomeIcon icon={faYoutube} />
            )
          }
        </StreamSpan>
        { runner?.stream.username}
      </NamePanel>
      {
        onAudio && (
          <AudioPanel color={team.color}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </AudioPanel>
        )
      }
      {
        isDone && (
          <DoneTimePanel color={team.color}>{ lastTime.displayedTime}</DoneTimePanel>
        )
      }
    </Container>
  )
}