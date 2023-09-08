import React from 'react';
import styled from 'styled-components';
import { Runner } from '../../../../nodecg/replicants';
import { useTeams } from '../../../hooks/nodecg';
import { RunnerIcon } from '../RunnerIcon';

type TeamResultsProps = {
    index: number;
};

const Container = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: 64px auto;
    grid-gap: 8px;
    padding: 8px;
    align-items: center;
    justify-items: stretch;
`;

const Header = styled.div`
    font-size: 36px;
    text-align: center;
`;

const ResultsView = styled.div`
  font-size: 32px;
  align-self: stretch;
  display: grid;
  align-items: center;
  padding: 8px 64px;
  grid-auto-flow: column;
  grid-template-columns: 1fr 16px 1fr;
`;

type TeamMemberProps = {
    player: Runner;
    teamIndex: number;
    gameIndex: number;
};

const TeamMemberContainer = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 64px auto;
`;

const TeamMember = ({ player, teamIndex, gameIndex }: TeamMemberProps) => {
  return (
    <TeamMemberContainer>
      <RunnerIcon teamIndex={teamIndex} gameIndex={gameIndex} />
      <div>
        { player.name }
      </div>
    </TeamMemberContainer>
  );
};

export const TeamResults = ({ index }: TeamResultsProps) => {
  const teams = useTeams();
  const team = teams[index];

  const length = team.members.length;

  const firstMembers = team.members.slice(0, length / 2);
  const lastMembers = team.members.slice(length / 2);

  return (
    <Container>
      <Header>
        { team.name } 走者の皆さま
      </Header>
      <ResultsView>
        <div>
          {
            firstMembers.map((player, gIndex) => player && (
              <TeamMember player={player} teamIndex={index} gameIndex={gIndex}/>
            ))
          }
        </div>
        <div />
        <div>
          {
            lastMembers.map((player, gIndex) => player && (
              <TeamMember player={player} teamIndex={index} gameIndex={firstMembers.length + gIndex}/>
            ))
          }
        </div>
      </ResultsView>
      <div />
    </Container>
  )
}