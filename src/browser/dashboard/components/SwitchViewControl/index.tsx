import { Card, CardContent, CardHeader, Stack, Button } from '@mui/material'
import React from 'react';
import { ShowResultsByGame } from './ShowResultsByGame';
import { ShowResultsByTeam } from './ShowResultsByTeam';

export const SwitchViewControl = () => {

  return (
    <Card>
      <CardHeader title='サブ画面表示切り替え' />
      <CardContent>
        <Stack direction='column' spacing={1}>
          <ShowResultsByGame />
          <ShowResultsByTeam />
          <Button variant='contained' color='primary' onClick={() => {
            nodecg.sendMessage('show:pregressChart');
          }}>通過順グラフ表示</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}