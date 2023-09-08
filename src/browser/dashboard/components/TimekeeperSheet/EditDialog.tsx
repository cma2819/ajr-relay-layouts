import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useReplicant, useTeams } from '../../../hooks/nodecg';
import { toHours, toMinutes, toSeconds } from '../../../utils/time';
import { EditTimeInput, EditTimeInputProps } from './EditTimeInput';

export type EditIndexes = {
    game: number;
    segment: number;
    team: number;
}

type Props = {
    dialogProps: DialogProps;
    indexes: EditIndexes;
}

export const EditDialog = ({ dialogProps, indexes }: Props) => {
  const checkpointResults = useReplicant('checkpoint-results');
  const result = checkpointResults?.[indexes.game]?.[indexes.segment]?.[indexes.team];
  const [time, setTime] = useState<EditTimeInputProps['value']>(
    result
      ? {
        hours: toHours(result.time).toFixed(),
        minutes: String(toMinutes(result.time).toFixed()).padStart(2, '0'),
        seconds: String(toSeconds(result.time).toFixed()).padStart(2, '0'),
      }
      : {hours: '', minutes: '', seconds: ''}
  )

  const teams = useTeams();
  const runner = teams?.[indexes.team]?.members?.[indexes.game];
    
  const games = nodecg.bundleConfig.games;
  const segment = games?.[indexes.game]?.segments?.[indexes.segment];

  const submitEdit = () => {
    const timeDuration = moment.duration(`${time.hours || '0'}:${time.minutes}:${time.seconds}`);
    if (timeDuration.asSeconds() > 0) {
      nodecg.sendMessage('timekeeping:record', {
        indexes,
        time: timeDuration.asSeconds(),
      });
      dialogProps.onClose?.({}, 'backdropClick');
    }
  }

  const cancelEdit = () => {
    dialogProps.onClose?.({}, 'backdropClick');
  }

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        区間タイム編集
      </DialogTitle>
      <DialogContent>
        <ul>
          <li>走者: { runner?.name ?? 'Anonymous' }</li>
          <li>区間: { segment }</li>
        </ul>
        <EditTimeInput value={time} dispatcher={setTime} />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={submitEdit}>保存</Button>
        <Button variant='contained' color='warning' onClick={cancelEdit}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}