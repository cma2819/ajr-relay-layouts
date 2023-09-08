import React from 'react';
import styled from 'styled-components';
import Logo from '../../resources/logo.png';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    background-image: url(${Logo});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;

export const NothingView = () => {
  return (
    <Container />
  );
}