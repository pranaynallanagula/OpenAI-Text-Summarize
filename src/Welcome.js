import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/bg.jpeg';

const Container = styled.div`
  background-image:  url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  overflow-x: hidden;
  height: 100vh;
  position: relative;
`;

const BirdsContainer = styled.div`
  position: absolute;
  top: 10vw;
  animation: birdsFlying 30s linear infinite;
  animation-delay: 0s;
  animation-timing-function: linear;

  @keyframes birdsFlying {
    0% {
      left: 100vw;
    }
    100% {
      left: -200vw;
    }
  }
`;

const WelcomeText = styled.div`
  color: white;
  text-shadow: 2px 2px 5px black;
  position: fixed;
  text-align: center;
  height: 100vh;
  line-height: 100vh;
  font-size: 40px;
  font-family: "Courier New", Courier, monospace;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
`;

const Welcome = () => {
  return (
    <Container>
      <BirdsContainer>
        <img src="https://clipart-library.com/img1/1663317.gif" width='200px' height="10px" draggable="false" alt="Birds" />
      </BirdsContainer>
      <div className='flex flex-col items-center justify-center mt-4 p-40'>
        <h1 className='text-3xl text-blue-900 text-center leading-10 font-bold'>
          Welcome to SwiftSynopsis!
        </h1>
        <p className='mt-5 text-lg italic text-gray sm:text-xl text-center max-w-2xl'>
          Our app allows you to effortlessly summarize your text using the power of OpenAI Summarizer. Just paste your content, select a language, and get a concise summary in no time.
        </p>
      </div>
      <Link to="/app">
        <WelcomeText>Explore →</WelcomeText>
      </Link>
    </Container>
  );
};

export default Welcome;
