import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  color: #222222;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export type ViewCardProps = {
    className?: string;
    children: ReactNode;
}

export const ViewCard = ({ className, children }: ViewCardProps) => {
  return (
    <Card className={className}>
      { children }
    </Card>
  )
}