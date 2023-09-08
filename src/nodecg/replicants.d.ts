import {
  AudioAssign,
  CheckpointResults,
  Commentators,
  Configschema,
  CurrentCheckpoints,
  LatestCheckpoints,
  RankProgress,
  Timer,
  TotalTimes,
} from './generated';

type Team = Configschema['teams'][number];

type Runner = Configschema['runners'][number];

type CpResult = CheckpointResults[number][number][number];

type LatestCheckpoint = NonNullable<LatestCheckpoints>['times'][number];

type LatestCpSegment = NonNullable<LatestCheckpoints>['segment'];

type CurrentCp = CurrentCheckpoints[number];


type Commentator = Commentators[number]

type ReplicantMap = {
  'checkpoint-results': CheckpointResults;
  'latest-checkpoints': LatestCheckpoints;
  'rank-progress': RankProgress;
  'total-times': TotalTimes;
  timer: Timer;
  'audio-assign': AudioAssign;
  'current-checkpoints': CurrentCheckpoints;
  commentators: Commentators;
};

export {
  Team,
  Runner,
  CheckpointResults,
  CpResult,
  LatestCheckpoint,
  LatestCpSegment,
  LatestCheckpoints,
  RankProgress,
  TotalTimes,
  Timer,
  AudioAssign,
  CurrentCheckpoints,
  CurrentCp,
  Commentator,
  Commentators,
  ReplicantMap,
};
