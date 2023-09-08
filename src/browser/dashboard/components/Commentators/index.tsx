import { Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useReplicant } from '../../../hooks/nodecg';
import { CommentatorList } from './CommentatorList';
import { v4 as uuidv4} from 'uuid'

export const Commentators = () => {
  const commentators = useReplicant('commentators');
  const commentatorRep = nodecg.Replicant('commentators', { defaultValue: []});

  const [ newName, setNewName ] = useState<string>('');

  const addCommentator = (name: string) => {
    commentatorRep.value = [
      ... commentators,
      {
        pk: uuidv4(),
        name,
        avatar: '',
      }
    ];
  }

  const removeCommentator = (pk: string) => {
    commentatorRep.value = commentators.filter(commentator => commentator.pk !== pk);
  }

  return (
    <Card>
      <CardHeader title='しゃべる人表示' />
      <CardContent>
        <Stack spacing={2}>
          <CommentatorList commentators={commentators} onDelete={(pk) => {
            removeCommentator(pk);
          }} />
          <TextField value={newName} onChange={(e) => {
            setNewName(e.currentTarget.value);
          }} />
          <Button variant='contained' onClick={() => {
            addCommentator(newName);
          }}>追加</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}