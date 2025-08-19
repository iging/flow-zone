import styled from "styled-components";
import { useContext, useEffect } from "react";
import Clock from "./Clock/Clock";
import { StateContext } from "../../../context/GlobalContext";
import { motion } from "framer-motion";

const Progress = () => {
  const { progress, setProgress, time, initTime } = useContext(StateContext);

  useEffect(() => {
    setProgress(time / (initTime / 100));
  }, [setProgress, time, initTime]);

  return (
    <ProgressWrapper>
      <OuterCircle $progress={progress}>
        <ProgressGlow $progress={progress} />
        <InnerCircle
          as={motion.div}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Clock />
        </InnerCircle>
      </OuterCircle>
    </ProgressWrapper>
  );
};

export default Progress;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OuterCircle = styled.div`
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  background: conic-gradient(
    ${(props) => props.theme.colors.primary} ${({ $progress }) => $progress}%,
    rgba(30, 30, 30, 0.6) ${({ $progress }) => $progress}%
  );
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 30rem;
    height: 30rem;
  }

  @media (max-width: 420px) {
    width: 26rem;
    height: 26rem;
  }
`;

const ProgressGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ $progress }) => `conic-gradient(
    rgba(231, 76, 60, 0.5) 0% ${$progress}%,
    transparent ${$progress}% 100%
  )`};
  filter: blur(15px);
  opacity: 0.4;
  z-index: 0;
`;

const InnerCircle = styled.div`
  width: 38rem;
  height: 38rem;
  background: linear-gradient(
    145deg,
    rgba(35, 35, 35, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.7),
    inset -2px -2px 5px rgba(255, 255, 255, 0.1);
  z-index: 1;

  @media (max-width: 768px) {
    width: 28rem;
    height: 28rem;
  }

  @media (max-width: 420px) {
    width: 24rem;
    height: 24rem;
  }
`;
