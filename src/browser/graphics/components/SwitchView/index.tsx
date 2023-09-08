import React, { useState, useEffect } from 'react';
import { NothingView } from './NotingView';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './styles.css'
import { ProgressChart } from './ProgressChart';
import { GameResults } from './GameResults';
import { TeamResults } from './TeamResults';

type ShowingView = 'none' | 'resultsByGame' | 'resultsByTeam' | 'progressChart';

const EXIT_TIMEOUT = 60_000;

export const SwitchView = () => {

  let timeoutId: NodeJS.Timeout;
  const [ show, setShow ] = useState<ShowingView>('none');
  const [ gameIndex, setGameIndex ] = useState<number>(0);
  const [ teamIndex, setTeamIndex ] = useState<number>(0);

  const reserveExit = () => {
    timeoutId = setTimeout(() => {
      exitShow();
    }, EXIT_TIMEOUT);
  }

  const exitShow = () => {
    setShow('none');
  }

  useEffect(() => {

    nodecg.listenFor('show:resultsByGame', ({ gameIndex }) => {
      timeoutId && clearTimeout(timeoutId);
      setGameIndex(gameIndex);
      setShow('resultsByGame');
      reserveExit();
    });
  
    nodecg.listenFor('show:resultsByTeam', ({ teamIndex }) => {
      timeoutId && clearTimeout(timeoutId);
      setTeamIndex(teamIndex);
      setShow('resultsByTeam');
      reserveExit();
    });
  
    nodecg.listenFor('show:pregressChart', () => {
      timeoutId && clearTimeout(timeoutId);
      setShow('progressChart');
      reserveExit();
    });

  }, []);

  return (
    <SwitchTransition>
      <CSSTransition
        key={show}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames='fade'
      >
        <>
          {
            show === 'none' && (
              <NothingView />
            )
          }
          {
            show === 'resultsByGame' && (
              <GameResults index={gameIndex} />
            )
          }
          {
            show === 'resultsByTeam' && (
              <TeamResults index={teamIndex} />
            )
          }
          {
            show === 'progressChart' && (
              <ProgressChart />
            )
          }
        </>
      </CSSTransition>
    </SwitchTransition>
  )
}