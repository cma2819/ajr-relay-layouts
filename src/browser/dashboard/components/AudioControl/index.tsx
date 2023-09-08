import { Card, CardHeader, CardContent, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { useReplicant, useTeams } from '../../../hooks/nodecg';

export const AudioControl = () => {
  const teams = useTeams();
  const audioAssign = useReplicant('audio-assign');
  const audioAssignRep = nodecg.Replicant('audio-assign');

  return (
    <Card>
      <CardHeader title='音声割り振り' />
      <CardContent>
        <FormGroup>
          {
            teams.map((team, tIndex) => (
              <FormControlLabel control={<Checkbox checked={audioAssign.includes(tIndex)} onChange={(e) => {
                if (e.target.checked) {
                  audioAssignRep.value = [
                    ...audioAssign,
                    tIndex,
                  ]
                }
                else {
                  audioAssignRep.value = audioAssign.filter((index) => index !== tIndex);
                }
              }} />} label={team.name} />
            ))
          }
        </FormGroup>
      </CardContent>
    </Card>
  )
}