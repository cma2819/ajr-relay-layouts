import { TimeCalculation } from '.';
import { CpResult } from '../../nodecg/replicants';

export const SumOfGameResults: TimeCalculation = {
  calculateTotal: (resultsByTeam) => {
    const latestsByGame = resultsByTeam.map((segments): CpResult | undefined => {
      const [last] = segments.filter((seg): seg is NonNullable<CpResult> => !!seg).slice(-1)
      return last;
    });

    return latestsByGame.reduce((total, latest) => {
      return total + (latest?.time ?? 0);
    }, 0);
  },
};
