import { CpResult } from '../../nodecg/replicants';

export type TimeCalculation = {
  calculateTotal: (resultsByTeam: CpResult[][]) => number;
};