import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ViewType } from '.'
import { useReplicant } from '../../../hooks/nodecg';
import './styles.css';

type Props = {
    type: ViewType;
}

export const ProgressHeader = ({ type }: Props) => {
  const latest = useReplicant('latest-checkpoints');
  const games = nodecg.bundleConfig.games;

  const latestCheckpoint = latest ? games?.[latest.segment.game]?.segments[latest.segment.index] : null;

  return (
    <span>
      <SwitchTransition>
        <CSSTransition
          key={type}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames='fade'
        >
          <div>
            { type === 'current' && (<span>現在の区間</span>)}
            { type === 'latest' && (
              <div>
                <span>{latestCheckpoint}</span>
                <br />
                <span>通過タイム</span>
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </span>
  )
}