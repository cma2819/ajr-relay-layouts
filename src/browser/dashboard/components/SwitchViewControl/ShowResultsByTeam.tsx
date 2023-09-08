import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import React from 'react';
import { useState } from 'react'
import { useTeams } from '../../../hooks/nodecg';

export const ShowResultsByTeam = () => {

  const [ selectTeam, setSelectTeam ] = useState<number>(0);

  const teams = useTeams();

  const goToLive = () => {
    nodecg.sendMessage('show:resultsByTeam', { teamIndex: selectTeam });
  }

  return (
    <>
      <FormControl>
        <InputLabel id="switch-view-label">チーム毎予選結果表示</InputLabel>
        <Select
          labelId='switch-view-label'
          id='switch-view-select'
          label='ゲーム毎予選結果表示'
          value={selectTeam}
          onChange={(e) => {
            setSelectTeam(Number(e.target.value));
          }}
        >
          {
            teams.map((team, index) => (
              <MenuItem key={index} value={index}>{ team.name }</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Button onClick={goToLive}>チーム毎予選結果を表示</Button>
    </>
  )
}