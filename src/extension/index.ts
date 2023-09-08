import { NodeCG } from './nodecg';
import { progress } from './progress';
import { summary } from './summary';
import { SumOfGameResults } from './time-calculation/sum-of-games';
import { timekeeping } from './timekeeping';
import { timer } from './timer';

export default (nodecg: NodeCG): void => {
  timekeeping(nodecg);
  summary(nodecg, SumOfGameResults);
  progress(nodecg);
  timer(nodecg);
  // voiceChannel(nodecg);
};
