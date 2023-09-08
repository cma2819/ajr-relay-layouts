import React, { ReactNode } from 'react';
import { ReplicantProvider } from '../../ReplicantProvider';
import { TeamsProvider } from '../../TeamsProvider';
import { AppBackground, RectPath } from './AppBackground';

type GraphicsAppProps = {
    backgroundImage: string;
    width: number;
    height: number;
    children: ReactNode;
    clipPaths?: RectPath[];
};

export const GraphicsApp = ({ backgroundImage, width, height, clipPaths, children }: GraphicsAppProps) => {
  return (
    <ReplicantProvider>
      <TeamsProvider>
        <AppBackground backgroundImage={backgroundImage} width={width} height={height} clipPath={clipPaths ?? []} />
        { children }
      </TeamsProvider>
    </ReplicantProvider>
  );
}