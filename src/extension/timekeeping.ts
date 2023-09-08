import clone from 'clone';
import { NodeCG } from './nodecg';
import { toDisplayedTime } from './utils';

export const timekeeping = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger('timekeeping');
  const checkpointResultsRep = nodecg.Replicant('checkpoint-results', {
    defaultValue: [],
  });

  const games = nodecg.bundleConfig.games;
  const teams = nodecg.bundleConfig.teams;

  const initialize = (resetAll = false) => {
    const persisted = resetAll ? [] : clone(checkpointResultsRep.value);

    checkpointResultsRep.value = games.map((game, gIndex) =>
      game.segments.map((_, sIndex) =>
        teams.map(
          (__, tIndex) => persisted?.[gIndex]?.[sIndex]?.[tIndex] ?? null
        )
      )
    );
  };

  const recordCheckpointResult = (
    timeInSeconds: number,
    game: number,
    segment: number,
    team: number
  ) => {
    const vRep = checkpointResultsRep.value?.[game]?.[segment]?.[team];
    if (vRep === undefined) {
      return;
    }
    checkpointResultsRep.value[game][segment][team] = {
      time: timeInSeconds,
      displayedTime: toDisplayedTime(timeInSeconds),
    };
    logger.debug(
      `Set ${JSON.stringify({
        time: timeInSeconds,
        displayedTime: toDisplayedTime(timeInSeconds),
      })}`
    );
  };

  const deleteCheckpointResult = (
    game: number,
    segment: number,
    team: number
  ) => {
    const vRep = checkpointResultsRep.value?.[game]?.[segment]?.[team];
    if (vRep === undefined) {
      return;
    }
    checkpointResultsRep.value[game][segment][team] = null;
    logger.debug(
      `Delete ${JSON.stringify({
        game,
        segment,
        team,
      })}`
    );
  };

  const deleteAllResults = () => {
    initialize(true);
  }

  initialize();

  nodecg.listenFor('timekeeping:record', (data, cb) => {
    if (cb && cb.handled) {
      return;
    }
    recordCheckpointResult(
      data.time,
      data.indexes.game,
      data.indexes.segment,
      data.indexes.team
    );
  });

  nodecg.listenFor('timekeeping:delete', (data, cb) => {
    if (cb && cb.handled) {
      return;
    }
    deleteCheckpointResult(
      data.indexes.game,
      data.indexes.segment,
      data.indexes.team
    );
  });

  nodecg.listenFor('timekeeping:reset', (data, cb) => {
    if (cb && cb.handled) {
      return;
    }

    deleteAllResults();
  })
};
