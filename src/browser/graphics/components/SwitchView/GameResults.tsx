import React from 'react';
import styled from 'styled-components';
import { useTeams } from '../../../hooks/nodecg';
import { RunnerIcon } from '../RunnerIcon';

type GameResultsProps = {
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
  grid-template-columns: 1fr 64px auto 16px auto 1fr;
`;

export const GameResults = ({ index }: GameResultsProps) => {
  const games = nodecg.bundleConfig.games;
  const game = games?.[index]
  const teams = useTeams();
  const players = teams.map(t => t.members?.[index] );

  return (
    <Container>
      <Header>
        { game.name ?? '' } 予選通過結果
      </Header>
      <ResultsView>
        {
          players.map((player, tIndex) => (
            <React.Fragment key={tIndex}>
              <div />
              <RunnerIcon gameIndex={index} teamIndex={tIndex} />
              <div>{ player?.name }</div>
              <div />
              <div>{ player?.result }</div>
              <div />
            </React.Fragment>
          ))
        }
      </ResultsView>
    </Container>
  )
}