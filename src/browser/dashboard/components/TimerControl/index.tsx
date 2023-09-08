import { Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useReplicant } from '../../../hooks/nodecg';

export const TimerControl = () => {
  const timer = useReplicant('timer');
  const [ startAt, setStartAt ] = useState<string>('');

  const submitUpdateStart = () => {
    nodecg.sendMessage('timer:updateStartAt', new Date(startAt).getTime());
  }

  const canUpdate = () => {
    return startAt !== '';
  }

  return (
    <Card>
      <CardHeader title='タイマー操作' />
      <CardContent>
        <Stack spacing={2}>
          <div>
            <label>開始日時：
              <input type='datetime-local' onChange={(e) => {
                setStartAt(e.currentTarget.value);
              }} value={startAt} />
            </label>
          </div>
          <Button variant='contained' color='primary' onClick={submitUpdateStart} disabled={!canUpdate()}>開始日時更新</Button>
          <TextField label='経過タイム' value={timer.time.displayed} inputProps={{
            readonly: true,
          }}/>
        </Stack>
      </CardContent>
    </Card>
  );
}