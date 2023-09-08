import { Stack, Card, CardHeader, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useReplicant, useTeams } from '../../../hooks/nodecg'
import { ResultCard } from './ResultCard';

export const LatestResults = () => {

  const latestCheckpoints = useReplicant('latest-checkpoints');
  const teams = useTeams();
  const games = nodecg.bundleConfig.games;

  const sorted = [... latestCheckpoints?.times.map((latest, index) => [latest, teams[index]] as const) ?? []].sort(([a], [b]) => a.rank - b.rank);
  return (
    <Stack direction='row' spacing={2}>
      <Card>
        <CardHeader title='通過区間' />
        <CardContent>
          {
            latestCheckpoints ? (
              <>
                <Typography paragraph>
                  { games?.[latestCheckpoints.segment.game].name }
                  { games?.[latestCheckpoints.segment.game].category }
                </Typography>
                <Typography paragraph>
                  { games?.[latestCheckpoints.segment.game]?.segments[latestCheckpoints.segment.index] }
                </Typography>
              </>
            ) : (
              <Typography paragraph>全チームが通過した区間がありません。</Typography>
            )
          }

        </CardContent>
      </Card>
      {sorted.map(([latest, team], index) => (
        <ResultCard key={`result_${index}`} result={latest} team={team} />
      ))}
    </Stack>
  )
}