import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DetailWrapper, Wrapper } from './GlobalStyles';
import Loader from './Loader';
import { API_URL } from './config';

const SpeakerDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [speakerInfo, setMovieInfo] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );

  console.log(speakerInfo)

  // array to filter out useless info
  const filteredOutInfo = ['talk_id', 'speaker', 'title', 'description', '_id', 'id', '__v'];

  const stringFix = (input) => {
   return input[0].toUpperCase() + input.slice(1).replace('_', ' ') 
};

useEffect(() => {
    if (accessToken) {
    }
    fetch(`${API_URL}/speaker/${id}`, {
      method: 'get',
      headers: {
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMovieInfo(data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken]);

  if (speakerInfo.message === 'Invalid id') {
    return <Wrapper>That movie does not exist</Wrapper>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <DetailWrapper>
      <h1>{speakerInfo.speaker}</h1>
      <Description>{speakerInfo.title}</Description>
      <ul>
        {Object.entries(speakerInfo).map((info) => {
          const [key, value] = info;
          if (filteredOutInfo.some((u) => u === key)) {
            return null;
          }
          return (
            <li key={key}>
              {stringFix(key)}: {value}
            </li>
          );
        })}
      </ul>
    </DetailWrapper>
  );
};

export default SpeakerDetails;

const Description = styled.i`
  padding: 40px;
`;
