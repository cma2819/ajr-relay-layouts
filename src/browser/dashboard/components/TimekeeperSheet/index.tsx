import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TableBody
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useReplicant, useTeams } from '../../../hooks/nodecg';
import styled from 'styled-components';
import { EditDialog, EditIndexes } from './EditDialog';

const GameTableCell = styled(TableCell)`
    font-weight: bold;
    text-align: center;
`

const LabelTableCell = styled(TableCell)``;

type EditContext = { indexes: EditIndexes };

type TimekeeperSheetProps = {
  editable?: boolean;
}

export const TimekeeperSheet = ({ editable }: TimekeeperSheetProps = { editable: true }) => {
  const teams = useTeams();
  const games = nodecg.bundleConfig.games;
  const checkpointResults = useReplicant('checkpoint-results');
  const totalTimes = useReplicant('total-times');

  const [ isOpenDialog, setOpenDialog ] = useState<boolean>(false);
  const [ editContext, setEditContext ] = useState<EditContext>({
    indexes: {game: -1, segment: -1, team: -1},
  });

  const openDialog = (context: EditContext) => {
    setEditContext(context);
    setOpenDialog(true);
  }

  const deleteResult = (context: EditContext) => {
    if (confirm('記録を削除しますか？元に戻すことはできません')) {
      nodecg.sendMessage('timekeeping:delete', { indexes: context.indexes });
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <LabelTableCell />
              {
                teams.map((t, index) => (
                  <TableCell key={`tName_${index}`}>{t.name}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          {
            games.map((game, gIndex) => (
              <TableBody key={`body_${gIndex}`}>
                <TableRow>
                  <GameTableCell colSpan={teams.length + 1}>{game.name}</GameTableCell>
                </TableRow>
                <TableRow component={'th'}>
                  <LabelTableCell />
                  {
                    teams.map((t, index) => (
                      <TableCell key={`rName_${index}_${gIndex}`}>
                        {t.members?.[gIndex]?.name ?? ''}
                      </TableCell>
                    ))
                  }
                </TableRow>
                {
                  game.segments.map((segment, sIndex) => (
                    <TableRow key={`segment_${sIndex}`}>
                      <LabelTableCell component={'th'} scope='row'>{segment}</LabelTableCell>
                      {
                        teams.map((_, tIndex) => (
                          <TableCell key={`time_${sIndex}_${tIndex}`}>
                            { checkpointResults?.[gIndex]?.[sIndex]?.[tIndex]?.displayedTime ?? '' }
                            {
                              editable && (
                                <>
                                  <IconButton size='small' aria-label='edit' onClick={() => openDialog({
                                    indexes: {
                                      game: gIndex,
                                      segment: sIndex,
                                      team: tIndex,
                                    }
                                  })}>
                                    <EditIcon />
                                  </IconButton>
                                  {
                                    checkpointResults?.[gIndex]?.[sIndex]?.[tIndex] && (
                                      <IconButton size='small' aria-label='delete' onClick={() => deleteResult({
                                        indexes: {
                                          game: gIndex,
                                          segment: sIndex,
                                          team: tIndex,
                                        }
                                      })}>
                                        <DeleteIcon />
                                      </IconButton>
                                    )
                                  }
                                </>
                              )
                            }
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
                {
                  totalTimes[gIndex] && (
                    <TableRow>
                      <TableCell sx={{
                        fontWeight: 'bold'
                      }}>
                        合計タイム
                      </TableCell>
                      { totalTimes[gIndex].map((total => (
                        <TableCell sx={{
                          fontWeight: 'bold'
                        }}>
                          { total.displayedTime }
                        </TableCell>
                      ))) }
                    </TableRow>
                  )
                }
              </TableBody>
            ))
          }
        </Table>
      </TableContainer>
      <EditDialog
        key={`${editContext.indexes.game}_${editContext.indexes.segment}_${editContext.indexes.team}`}
        dialogProps={{
          open: isOpenDialog,
          onClose: () => {
            setOpenDialog(false);
          }
        }} indexes={editContext.indexes} />
    </>
  );
}