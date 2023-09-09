import { CheckpointResults, RankProgress } from '../nodecg/generated';
import { NodeCG } from './nodecg';

export const progress = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger('progress');
  const progressRep = nodecg.Replicant('rank-progress', { defaultValue: [] });
  const checkpointResultsRep = nodecg.Replicant('checkpoint-results');

  const games = nodecg.bundleConfig.games;

  const totalTimesTo = (results: CheckpointResults, gameIndex: number, segIndex: number, teamIndex: number): number => {
    return results.reduce((prev, resultsByGame, gIndex) => {
      if (gIndex > gameIndex) {
        return prev;
      }
      if (gIndex === gameIndex) {
        return prev + (resultsByGame?.[segIndex]?.[teamIndex]?.time ?? 0);
      }
      const [lastInGame] = resultsByGame.slice(-1);
      return prev + (lastInGame?.[teamIndex]?.time ?? 0);
    }, 0);
  }

  const calculateProgress = (cpResults: CheckpointResults): void => {
    const progress = cpResults.reduce((prev, resultsPerGame, gIndex) => {
      const existsAnyResultInGame = resultsPerGame.some(results => results.some(r => !!r));
      if (!existsAnyResultInGame) {
        return prev;
      }
      return [
        ... prev,
        ... resultsPerGame.map((results, sIndex) => {
          const label = `${games?.[gIndex]?.segments?.[sIndex]}`;
          const resultTimes = [...results.map((r, tIndex) => r?.time ? totalTimesTo(cpResults, gIndex, sIndex, tIndex) : Number.MAX_VALUE)].sort((a, b) => {
            return a - b;
          });
          const ranks = results.map((r, tIndex) => r ? resultTimes.indexOf(totalTimesTo(cpResults, gIndex, sIndex, tIndex)) + 1 : null);

          return {
            label,
            ranks,
          }
        }).filter(({ ranks }) => {
          return ranks.some(r => r)
        })
      ]
    }, [] as RankProgress)

    progressRep.value = progress;
    logger.debug(`Update progress to ${JSON.stringify(progress)}`);
  }

  checkpointResultsRep.on('change', (newVal) => {
    calculateProgress(newVal);
  });
}