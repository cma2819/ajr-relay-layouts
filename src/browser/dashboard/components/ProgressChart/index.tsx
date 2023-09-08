import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { RankProgress } from '../../../common/RankProgress';

export const ProgressChart = () => {
  return (
    <Card>
      <CardHeader title='通過順グラフ' />
      <CardContent>
        <RankProgress />
      </CardContent>
    </Card>
  )
}