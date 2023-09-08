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
    width: number;
    height: number;
    reverse?: boolean;
}

const Logo = styled.div<{
    width: number;
    height: number;
    url: string;
    reverse?: boolean;
}>`
    width: ${props => props.height}px;
    height: ${props => props.width}px;
    background-image: ${props => `url(${props.url})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(${props => props.reverse ? 90 : -90}deg) translateY(${props => props.reverse ? props.width * 2 : props.width * -2}px) translateX(${props => props.reverse ? props.width * 2 : props.width * -2}px);
`


export const TeamLogo = ({ index, width, height, reverse }: TeamLogoProps) => {

  return (
    <Logo url={TeamLogos[index]} width={width} height={height} reverse={reverse} />
  )
}