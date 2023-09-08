import { Button } from '@mui/material';
import React from 'react';
import { Commentator } from '../../../../nodecg/replicants'

type CommentatorListProps = {
    commentators: Commentator[];
    onDelete: (pk: string) => void;
}

export const CommentatorList = ({
  commentators,
  onDelete,
}: CommentatorListProps) => {

  return (
    <div>
      {
        commentators.map(commentator => (
          <div key={commentator.pk}>
            { commentator.name }
            <Button variant='contained' onClick={() => {
              onDelete(commentator.pk)
            }}>削除</Button>
          </div>
        ))
      }
    </div>
  );
}