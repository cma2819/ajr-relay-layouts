import React from 'react'
import styled from 'styled-components'
import { RankProgress } from '../../../common/RankProgress'

const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 16px auto 16px;
    justify-items: center;
    padding: 8px;
`;

export const ProgressChart = () => {
  return (
    <Container>
      <div />
      <RankProgress />
      <div />

    </Container>
  )
}