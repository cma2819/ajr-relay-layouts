import React from 'react';
import { useReplicant } from '../../../hooks/nodecg'

export const Timer = () => {
  const timer = useReplicant('timer');

  return (
    <span>
      { timer.time.displayed }
    </span>
  )
}