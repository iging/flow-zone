import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <TomatoLoader>
          <TomatoBody>
            <TomatoStem />
            <TomatoLeaf />
          </TomatoBody>
          <ClockFace>
            <MinuteHand />
            <SecondHand />
            <ClockCenter />
          </ClockFace>
        </TomatoLoader>
        <LoaderText>
          Loading
          <Dots>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Dots>
        </LoaderText>
      </LoaderWrapper>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

const TomatoLoader = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`;

const TomatoBody = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: #e74c3c;
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(231, 76, 60, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 70% 70%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 20%
    );
  }
`;

const TomatoStem = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 2rem;
  background-color: #2ecc71;
  border-radius: 0.5rem;
  z-index: -1;
`;

const TomatoLeaf = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 60%;
  width: 2.5rem;
  height: 1.5rem;
  background-color: #2ecc71;
  border-radius: 50% 50% 0 50%;
  transform: rotate(30deg);
  z-index: -1;
`;

const ClockFace = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.5rem;
  height: 6.5rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const minuteRotation = keyframes`
  0% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  100% {
    transform: translate(-50%, 0) rotate(360deg);
  }
`;

const MinuteHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 0;
  width: 0.6rem;
  height: 2.2rem;
  background-color: #333;
  border-radius: 0.3rem;
  transform: translate(-50%, 0) rotate(0deg);
  animation: ${minuteRotation} 3s linear infinite;
`;

const secondRotation = keyframes`
  0% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  100% {
    transform: translate(-50%, 0) rotate(360deg);
  }
`;

const SecondHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 0;
  width: 0.3rem;
  height: 2.8rem;
  background-color: #e74c3c;
  border-radius: 0.3rem;
  transform: translate(-50%, 0) rotate(0deg);
  animation: ${secondRotation} 1s linear infinite;
`;

const ClockCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  background-color: #333;
  border-radius: 50%;
  border: 0.2rem solid #e74c3c;
`;

const LoaderText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: white;
  letter-spacing: 0.1rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const dotAnimation = keyframes`
  0%, 20% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
  80%, 100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

const Dots = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;

  span {
    opacity: 0;
    animation: ${dotAnimation} 1.4s infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;
