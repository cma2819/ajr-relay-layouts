import React from 'react';
import styled from 'styled-components';
import ALogo from '../../resources/logos/a.png'
import BLogo from '../../resources/logos/b.png'
import CLogo from '../../resources/logos/c.png'

const TeamLogos = {
  0: ALogo,
  1: BLogo,
  2: CLogo,
} as const;

type TeamLogoProps = {
    index: keyof typeof TeamLogos;
}

const Logo = styled.div<{
    url: string;
}>`
    width: 100%;
    height: 100%;
    background-image: ${props => `url(${props.url})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`


export const TeamLogoNoTransform = ({ index }: TeamLogoProps) => {

  return (
    <Logo url={TeamLogos[index]} />
  )
}