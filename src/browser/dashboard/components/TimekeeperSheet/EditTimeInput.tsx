import { Stack, TextField, TextFieldProps } from '@mui/material'
import React, { useRef, useState } from 'react'

type Time = {
  hours: string;
  minutes: string;
  seconds: string;
}

export type EditTimeInputProps = {
    value: Time;
    dispatcher: React.Dispatch<React.SetStateAction<Time>>;
}

export const EditTimeInput = ({value, dispatcher}: EditTimeInputProps) => {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const [ hours, setHours ] = useState<string>(value.hours);
  const [ minutes, setMinutes ] = useState<string>(value.minutes);
  const [ seconds, setSeconds ] = useState<string>(value.seconds);

  const timeInputOnChange = (changed: 'hours' | 'minutes' | 'seconds', setState: React.Dispatch<React.SetStateAction<string>>, next?: React.RefObject<HTMLInputElement>): TextFieldProps['onChange'] => {
    return (e) => {
      setState(e.currentTarget.value);
      dispatcher(
        {
          ... {
            hours,
            minutes,
            seconds,
          },
          [changed]: e.currentTarget.value
        });
      if (e.currentTarget.value.length === 2) {
        next?.current?.focus();
      }
    }
  }
    
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <TextField inputRef={hoursRef} label="hh" variant="outlined" onChange={timeInputOnChange('hours', setHours, minutesRef)} value={hours} />
      <div>:</div>
      <TextField inputRef={minutesRef} label="mm" variant="outlined" onChange={timeInputOnChange('minutes', setMinutes, secondsRef)} value={minutes} />
      <div>:</div>
      <TextField inputRef={secondsRef} label="ss" variant="outlined" onChange={timeInputOnChange('seconds', setSeconds)} value={seconds} />
    </Stack>
  )
}