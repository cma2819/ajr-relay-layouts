import { clone } from 'lodash';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AudioAssign, CheckpointResults, Commentators, CurrentCheckpoints, LatestCheckpoints, RankProgress, Timer, TotalTimes } from '../nodecg/generated';
import { BundleNodecgInstance } from './global';

type Replicants = {
  'checkpoint-results': CheckpointResults,
  'latest-checkpoints': LatestCheckpoints,
  'rank-progress': RankProgress,
  'total-times': TotalTimes,
  timer: Timer,
  'audio-assign': AudioAssign,
  'current-checkpoints': CurrentCheckpoints,
  commentators: Commentators,
}

const defaultValues: Replicants = {
  'checkpoint-results': [],
  'latest-checkpoints': null,
  'rank-progress': [],
  'total-times': [],
  timer: {
    startAt: 0,
    time: {
      inSecond: 0,
      displayed: '',
    }
  },
  'audio-assign': [],
  'current-checkpoints': [],
  commentators: [],
};

export const ReplicantContext = createContext<Replicants>(defaultValues);

type Props = {
  children: ReactNode;
}

export const ReplicantProvider = ({ children }: Props) => {
  nodecg as BundleNodecgInstance;

  const [checkpointResults, setCheckpointResults] = useState<CheckpointResults>(defaultValues['checkpoint-results']);
  const [latestCheckpoints, setLatestCheckpoints] = useState<LatestCheckpoints>(defaultValues['latest-checkpoints']);
  const [rankProgress, setRankProgress] = useState<RankProgress>(defaultValues['rank-progress']);
  const [totalTimes, setTotalTimes] = useState<TotalTimes>(defaultValues['total-times']);
  const [timer, setTimer] = useState<Timer>(defaultValues.timer);
  const [audioAssign, setAudioAssign] = useState<AudioAssign>(defaultValues['audio-assign']);
  const [currentCheckpoints, setCurrentCheckpoints] = useState<CurrentCheckpoints>(defaultValues['current-checkpoints']);
  const [commentators, setCommentators] = useState<Commentators>([]);

  useEffect(() => {
    nodecg.Replicant('checkpoint-results').on('change', (newVal) => {
      setCheckpointResults(clone(newVal));
    });
    nodecg.Replicant('latest-checkpoints').on('change', (newVal) => {
      setLatestCheckpoints(clone(newVal));
    });
    nodecg.Replicant('rank-progress').on('change', (newVal) => {
      setRankProgress(clone(newVal));
    });
    nodecg.Replicant('total-times').on('change', (newVal) => {
      setTotalTimes(clone(newVal));
    });
    nodecg.Replicant('timer').on('change', (newVal) => {
      setTimer(clone(newVal));
    });
    nodecg.Replicant('audio-assign', { defaultValue: defaultValues['audio-assign'] }).on('change', (newVal) => {
      setAudioAssign(clone(newVal));
    });
    nodecg.Replicant('current-checkpoints').on('change', (newVal) => {
      setCurrentCheckpoints(clone(newVal));
    });
    nodecg.Replicant('commentators').on('change', (newVal) => {
      setCommentators(clone(newVal));
    })
  }, []);

  return (
    <ReplicantContext.Provider value={{
      'checkpoint-results': checkpointResults,
      'latest-checkpoints': latestCheckpoints,
      'rank-progress': rankProgress,
      'total-times': totalTimes,
      timer,
      'audio-assign': audioAssign,
      'current-checkpoints': currentCheckpoints,
      commentators: commentators,
    }}>
      { children }
    </ReplicantContext.Provider>
  );
}