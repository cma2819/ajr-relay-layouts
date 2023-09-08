import clone from 'clone';
import { CheckpointResults, CpResult } from '../nodecg/replicants';
import { NodeCG } from './nodecg';
import { TimeCalculation } from './time-calculation';
import { toDisplayedTime } from './utils';

export const summary = (nodecg: NodeCG, calc: TimeCalculation): void => {
  const logger = new nodecg.Logger('summary');
  const latestCheckpointsRep = nodecg.Replicant('latest-checkpoints', {
    defaultValue: null,
  });
  const totalTimesRep = nodecg.Replicant('total-times', { defaultValue: [] });
  const currentCheckpointsRep = nodecg.Replicant('current-checkpoints', { defaultValue: [] });
  const checkpointResultsRep = nodecg.Replicant('checkpoint-results');
  
  const games = nodecg.bundleConfig.games;
  const teams = nodecg.bundleConfig.teams;
    
  const calculateLatestResult = (results: CheckpointResults) => {
    const cpResultsSnapshot = clone(results);
    const segmentIndexes = cpResultsSnapshot
      .flatMap((games, gIndex) =>
        games.map((results, sIndex) =>
          results.some((r): r is CpResult => !r)
            ? null
            : ([gIndex, sIndex] as const)
        )
      )
      .filter((segIndex): segIndex is [number, number] => !!segIndex);

    const [lastSegment] = segmentIndexes.slice(-1);
    if (!lastSegment) {
      latestCheckpointsRep.value = null;
      return;
    }

    const [lastGameIndex, lastSegmentIndex] = lastSegment;

    const resultsByTeam = teams.map((_, tIndex) =>
      cpResultsSnapshot.map((segments, gIndex) =>
        segments.map((results, sIndex) =>
          gIndex < lastGameIndex
            ? results?.[tIndex]
            : gIndex === lastGameIndex
              ? sIndex > lastSegmentIndex
                ? null
                : results?.[tIndex]
              : null
        )
      )
    );

    const latestTotals = resultsByTeam.map((results) => calc.calculateTotal(results));
    const sortedTimes = [...latestTotals].sort((a, b) => a - b);
    const [topTime] = sortedTimes;
    latestCheckpointsRep.value = {
      segment: {
        game: lastGameIndex,
        index: lastSegmentIndex
      },
      times: latestTotals.map(totalInSeconds => ({
        rank: sortedTimes.indexOf(totalInSeconds) + 1,
        time: toDisplayedTime(totalInSeconds),
        diffInSeconds: totalInSeconds - topTime,
      }))
    }
    
    logger.debug(`Set latest ${JSON.stringify(latestCheckpointsRep.value)}`)
  };

  const calculateTotalTimes = (results: CheckpointResults): void => {
    const cpResultsSnapshot = clone(results);

    const totalTimes = games.map((_, gIndex) => {
      const resultsUntilCalcGame = cpResultsSnapshot.filter((_, rIndex) => !(rIndex > gIndex));
      return teams.map((_, tIndex) => {
        const totalTimeInSecond = calc.calculateTotal(resultsUntilCalcGame.map((resultsByGame) => resultsByGame.map(results => results?.[tIndex])));
        return {
          time: totalTimeInSecond,
          displayedTime: toDisplayedTime(totalTimeInSecond),
        }
      })
    });

    totalTimesRep.value = totalTimes;
    logger.debug(`Set total times ${JSON.stringify(totalTimes)}`);
  };

  const calcTotalSegmentTo = (gIndex: number, sIndex: number): number => {
    const untilPrevGameSegments = games.slice(0, gIndex).reduce((prev, current) => {
      return prev + current.segments.length;
    }, 0);

    return untilPrevGameSegments + sIndex;
  }

  const calculateCurrentCheckpoints = (results: CheckpointResults): void => {
    const cpResultsSnapshot = clone(results);

    const currentCpsByTeam = teams.map((_, tIndex) => {
      const resultAndIndexes = cpResultsSnapshot.flatMap((resultsByGame, gIndex) => {
        return resultsByGame.map((results, sIndex) => {
          return [results?.[tIndex], [gIndex, sIndex]] as const;
        });
      }).filter(([result,]) => !!result);

      const [last] = resultAndIndexes.slice(-1);
      if (!last) {
        return {
          isDone: false,
          game: 0,
          label: games?.[0]?.segments?.[0],
          totalSegments: 0,
        }
      }
      const [, lastIndexes] = last;
      const [gIndex, sIndex] = lastIndexes;
      if (!games[gIndex]?.segments?.[sIndex + 1] && !games[gIndex + 1]) {
        return {
          isDone: true,
          game: gIndex,
          label: '完走！！！',
          totalSegments: calcTotalSegmentTo(gIndex, sIndex) + 1,
        }
      }

      const nextGame = games?.[gIndex]?.segments?.[sIndex + 1] ? gIndex : gIndex + 1;
      const nextSegment = games?.[gIndex]?.segments?.[sIndex + 1] ? sIndex + 1 : 0;
      return {
        isDone: false,
        game: nextGame,
        label: games?.[nextGame]?.segments?.[nextSegment],
        totalSegments: calcTotalSegmentTo(nextGame, nextSegment),
      }
    });

    const totals = currentCpsByTeam.map(({ totalSegments }) => totalSegments);
    const topTotals = Math.max(...totals);

    currentCheckpointsRep.value = currentCpsByTeam.map(({ isDone, label, game, totalSegments }) => ({
      isDone,
      label,
      game,
      diffCpCount: topTotals - totalSegments,
    }));

    logger.debug(`Set current cps ${JSON.stringify(currentCheckpointsRep.value)}`);
  }

  checkpointResultsRep.on('change', (newVal) => {
    calculateLatestResult(newVal);
    calculateTotalTimes(newVal);
    calculateCurrentCheckpoints(newVal);
  });
}