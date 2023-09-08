import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import React from 'react';
import { useState } from 'react'

export const ShowResultsByGame = () => {

  const [ selectGame, setSelectGame ] = useState<number>(0);

  const games = nodecg.bundleConfig.games;

  const goToLive = () => {
    nodecg.sendMessage('show:resultsByGame', { gameIndex: selectGame });
  }

  return (
    <>
      <FormControl>
        <InputLabel id="switch-view-label">ゲーム毎予選結果表示</InputLabel>
        <Select
          labelId='switch-view-label'
          id='switch-view-select'
          label='ゲーム毎予選結果表示'
          value={selectGame}
          onChange={(e) => {
            setSelectGame(Number(e.target.value));
          }}
        >
          {
            games.map((game, index) => (
              <MenuItem key={index} value={index}>{ game.name }</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Button onClick={goToLive}>ゲーム毎予選結果を表示</Button>
    </>
  )
}