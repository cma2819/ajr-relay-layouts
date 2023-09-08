import React from 'react';
import styled from 'styled-components';
import { Commentator } from '../../../../nodecg/replicants'
import { useReplicant } from '../../../hooks/nodecg'

type NameplateProps = {
    commentator: Commentator;
}

const NameplateContainer = styled.div`
    display: grid;
    height: 32px;
    grid-template-columns: 32px auto;
    align-items: center;
`;

const NameplateIcon = styled.div<{url: string}>`
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${props => `url(${props.url})`};
    clip-path: circle(50%);
`;

const NameplateName = styled.div``;

const Nameplate = ({commentator}: NameplateProps) => {
  return (
    <NameplateContainer>
      <NameplateIcon url={commentator.avatar} />
      <NameplateName>{commentator.name}</NameplateName>
    </NameplateContainer>
  )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`;

export const CommentatorNames = () => {
  const commentators = useReplicant('commentators');

  return (
    <Container>
      {commentators.map(commentator => (
        <Nameplate key={commentator.pk} commentator={commentator} />
      ))}
    </Container>
  )
}