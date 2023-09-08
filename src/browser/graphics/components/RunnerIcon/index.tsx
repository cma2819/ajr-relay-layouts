import a1 from '../../resources/progress/01_sms/a.gif';
import a2 from '../../resources/progress/02_salt/a.gif';
import a3 from '../../resources/progress/03_puzzle/a.gif';
import a4 from '../../resources/progress/04_splatoon/a.gif';
import a5 from '../../resources/progress/05_gibon/a.gif';
import a6 from '../../resources/progress/06_crash/a.gif';
import a7 from '../../resources/progress/07_smw/a.gif';
import a8 from '../../resources/progress/08_kirby/a.gif';
import a9 from '../../resources/progress/09_minecraft/a.gif';
import a10 from '../../resources/progress/10_dq3/a.gif';
import b1 from '../../resources/progress/01_sms/b.gif';
import b2 from '../../resources/progress/02_salt/b.gif';
import b3 from '../../resources/progress/03_puzzle/b.gif';
import b4 from '../../resources/progress/04_splatoon/b.gif';
import b5 from '../../resources/progress/05_gibon/b.gif';
import b6 from '../../resources/progress/06_crash/b.gif';
import b7 from '../../resources/progress/07_smw/b.gif';
import b8 from '../../resources/progress/08_kirby/b.gif';
import b9 from '../../resources/progress/09_minecraft/b.gif';
import b10 from '../../resources/progress/10_dq3/b.gif';
import c1 from '../../resources/progress/01_sms/c.gif';
import c2 from '../../resources/progress/02_salt/c.gif';
import c3 from '../../resources/progress/03_puzzle/c.gif';
import c4 from '../../resources/progress/04_splatoon/c.gif';
import c5 from '../../resources/progress/05_gibon/c.gif';
import c6 from '../../resources/progress/06_crash/c.gif';
import c7 from '../../resources/progress/07_smw/c.gif';
import c8 from '../../resources/progress/08_kirby/c.gif';
import c9 from '../../resources/progress/09_minecraft/c.gif';
import c10 from '../../resources/progress/10_dq3/c.gif';
import TopIcon from '../../resources/progress/top.gif';
import React from 'react';

const IconPaths = [
  [a1, b1, c1],
  [a2, b2, c2],
  [a3, b3, c3],
  [a4, b4, c4],
  [a5, b5, c5],
  [a6, b6, c6],
  [a7, b7, c7],
  [a8, b8, c8],
  [a9, b9, c9],
  [a10, b10, c10],
] as const;

export type RunnerIconProps = {
    gameIndex: number;
    teamIndex: number;
    top?: boolean;
}

export const RunnerIcon = ({ gameIndex, teamIndex, top }: RunnerIconProps) => {
  const icon = IconPaths[gameIndex][teamIndex];

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${icon})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      {
        top && (
          <div
            style={{
              position: 'relative',
              top: '0px',
              left: '0px',
              height: '32px',
              backgroundImage: `url(${TopIcon})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )
      }
    </div>
  )
}