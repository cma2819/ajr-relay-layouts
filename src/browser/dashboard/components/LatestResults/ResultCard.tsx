import { Card, CardContent, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import moment from 'moment';
import React from 'react'
import { LatestCheckpoint } from '../../../../nodecg/replicants'
import { Team } from '../../../TeamsProvider';

export type ResultCardProps = {
    team: Team;
    result: LatestCheckpoint;
}

export const ResultCard = ({ team, result }: ResultCardProps) => {
  const diffDuration = moment.duration(result.diffInSeconds, 'seconds');
    
  return (
    <Card>
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: team.color }}>{ result.rank }</Avatar>
      } title={team.name} />
      <CardContent>
        <Typography paragraph>通過タイム: {result.time}</Typography>
        <Typography paragraph>1位との差: {String(Math.floor(diffDuration.asMinutes())).padStart(2, '0')}:{String(diffDuration.seconds()).padStart(2, '0')}</Typography>
      </CardContent>
    </Card>
  )
}