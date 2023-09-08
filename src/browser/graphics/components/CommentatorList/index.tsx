import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { CommentatorNames } from './CommentatorNames';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 64px 2px auto 64px;
    align-items: center;
    justify-items: center;
`;

const Border = styled.div`
    margin: 8px 0;
    width: 100%;
    background-color: #222222;
    align-self: stretch;
`

export const CommentatorList = () => {

  return (
    <Container>
      <FontAwesomeIcon size='xl' icon={faMicrophone} />
      <Border />
      <CommentatorNames />
    </Container>
  )
}