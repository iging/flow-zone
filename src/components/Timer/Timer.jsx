import styled from "styled-components";
import Progress from "./Progress/Progress";
import { motion } from "framer-motion";

const Timer = () => {
  return (
    <TimerContainer
      as={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <GlowEffect />
      <Progress />
    </TimerContainer>
  );
};

export default Timer;

const TimerContainer = styled.div`
  position: relative;
  width: 45rem;
  height: 45rem;
  margin: 2rem auto;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(
    145deg,
    rgba(50, 50, 50, 0.8) 0%,
    rgba(30, 30, 30, 1) 100%
  );
  box-shadow: -15px -15px 30px rgba(60, 60, 60, 0.2),
    15px 15px 35px rgba(0, 0, 0, 0.5),
    inset 1px 1px 2px rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      transparent,
      transparent 40%,
      rgba(231, 76, 60, 0.5)
    );
    border-radius: 50%;
    z-index: -1;
  }

  @media (max-width: 768px) {
    width: 35rem;
    height: 35rem;
    margin: 1rem auto;
    padding: 1rem;
  }

  @media (max-width: 420px) {
    width: 30rem;
    height: 30rem;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(231, 76, 60, 0.15) 0%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: -1;
  opacity: 0.8;
`;
