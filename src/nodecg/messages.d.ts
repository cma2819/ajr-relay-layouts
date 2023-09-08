export type MessageMap = {
  'timekeeping:record': {
    data: {
      indexes: {
        game: number;
        segment: number;
        team: number;
      };
      time: number;
    };
  };

  'timekeeping:delete': {
    data: {
      indexes: {
        game: number;
        segment: number;
        team: number;
      };
    };
  };

  'timekeeping:reset': {};

  'timer:updateStartAt': {
    data: number;
  };

  'show:resultsByGame': {
    data: {
      gameIndex: number;
    }
  };
  'show:resultsByTeam': {
    data: {
      teamIndex: number;
    }
  };
  'show:pregressChart': {};
};
