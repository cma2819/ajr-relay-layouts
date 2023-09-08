import { NodeCG } from './nodecg';
import { toDisplayedTime } from './utils';

export const timer = (nodecg: NodeCG): void => {
  const timerRep = nodecg.Replicant('timer', { defaultValue: {
    startAt: 0,
    time: {
      inSecond: 0,
      displayed: '',
    }
  }});

  const tickTimer = (now: number) => {
    if (!timerRep.value) {
      return;
    }

    const diff = now - timerRep.value.startAt;
    const diffInSeconds = Math.floor(diff / 1000);

    timerRep.value.time = {
      inSecond: diffInSeconds,
      displayed: `${diffInSeconds < 0 ? '-' : ''}${toDisplayedTime(Math.abs(diffInSeconds))}`
    }
  }

  const updateStartAt = (startAt: number) => {
    if (!timerRep.value) {
      return;
    }

    timerRep.value.startAt = startAt;
  }

  setInterval(() => {
    const now = Date.now();
    tickTimer(now);
  }, 100);

  nodecg.listenFor('timer:updateStartAt', (newStartAt, cb) => {
    if (cb && cb.handled) {
      return;
    }

    updateStartAt(newStartAt);
  })
}