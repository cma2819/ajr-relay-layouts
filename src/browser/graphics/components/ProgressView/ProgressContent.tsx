import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ViewType } from '.'
import { CurrentCheckpoint } from '../CurrentCheckpoint';
import { LatestCheckpoint } from '../LatestCheckpoint';

type ProgressContentProps = {
    type: ViewType;
}

export const ProgressContent = ({ type }: ProgressContentProps) => {
  return (
    <SwitchTransition>
      <CSSTransition
        key={type}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames='fade-content'
      >
        <>
          { type === 'current' && (
            <CurrentCheckpoint />
          )}
          {
            type === 'latest' && (
              <LatestCheckpoint />
            )
          }
        </>
      </CSSTransition>
    </SwitchTransition>
  );
}