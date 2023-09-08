import { Button, Stack } from '@mui/material';
import React from 'react';

export const AdminControl = () => {
  return (
    <Stack spacing={2}>
      <Button variant='contained' color='warning' onClick={() => {
        if (confirm('チェックポイントの通過タイムを全て削除します。よろしいですか？')) {
          nodecg.sendMessage('timekeeping:reset')
        }
      }}>通過タイム削除</Button>
    </Stack>
  );
}