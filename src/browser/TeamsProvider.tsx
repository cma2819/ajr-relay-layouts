import React, { createContext, ReactNode } from 'react';
import {Runner as RepRunner, Team as ConfigTeam} from '../nodecg/replicants'

type Runner = RepRunner & {
  result: string;
}

export type Team = Omit<ConfigTeam, 'members'> & {
    members: (Runner | null)[],
};

export const TeamsContext = createContext<Team[]>([]);

type Props = {
  children: ReactNode;
}

export const TeamsProvider = ({ children }: Props) => {
  const teams = nodecg.bundleConfig.teams;
  const runners = nodecg.bundleConfig.runners;

  const provides = teams.map(t => ({
    name: t.name,
    color: t.color,
    members: t.members.map(member => {
      const runner = runners.find(r => r.pk === member.pk);

      return runner ? {
        ... runner,
        result: member.result,
      } : null;
    })
  }));

  return <TeamsContext.Provider value={provides}>{ children }</TeamsContext.Provider>
}