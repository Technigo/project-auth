import React from "react";
import styled from "styled-components/macro";

export const Container = styled.div`
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0.12);
  background: #fff;
  border-radius: 3px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const SubTitle = styled.p`
  margin: 0;
  color: #6b6b6b;
`;

const ThumbNail = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin-right: 10px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 3px 3px 0 0;
`;

const Content = styled.div`
  padding: 10px;
`;

const Card = ({ title, subTitle, thumbNailUrl, coverImage, className }) => {
  return (
    <Container className={className}>
      {coverImage && <CoverImage src={coverImage} />}
      <Content>
        <TitleBar>
          {thumbNailUrl && <ThumbNail url={thumbNailUrl} />}
          <div>
            {title && <Title>{title} </Title>}
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
          </div>
        </TitleBar>
      </Content>
    </Container>
  );
};
