import { CheckpointResults, RankProgress } from '../nodecg/generated';
import { NodeCG } from './nodecg';

export const progress = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger('progress');
  const progressRep = nodecg.Replicant('rank-progress', { defaultValue: [] });
  const checkpointResultsRep = nodecg.Replicant('checkpoint-results');

  const games = nodecg.bundleConfig.games;

  const calculateProgress = (results: CheckpointResults): void => {
    const progress = results.reduce((prev, resultsPerGame, gIndex) => {
      const existsAnyResultInGame = resultsPerGame.some(results => results.some(r => !!r));
      if (!existsAnyResultInGame) {
        return prev;
      }
      return [
        ... prev,
        ... resultsPerGame.map((results, sIndex) => {
          const label = `${games?.[gIndex]?.segments?.[sIndex]}`;
          const resultTimes = [...results.map(r => r?.time ?? Infinity)].sort((a, b) => {
            return a - b;
          });
          const ranks = results.map(r => r ? resultTimes.indexOf(r.time) + 1 : null);

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