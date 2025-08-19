import styled from "styled-components";
import { useContext } from "react";
import { StateContext } from "../../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaCircle,
  FaFire,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";

const Tracker = () => {
  const { completedSessions, activeTag } = useContext(StateContext);

  const currentCycle = Math.floor(completedSessions / 4) + 1;
  const focusInCycle = completedSessions % 4;
  const totalCompleted = completedSessions;

  const renderSessionIndicators = () => {
    return Array.from({ length: 4 }, (_, i) => {
      const isCompleted = i < focusInCycle;
      const isCurrent = i === focusInCycle && activeTag === 0;

      return (
        <ProgressDot
          key={i}
          $completed={isCompleted}
          $current={isCurrent}
          as={motion.div}
          animate={{
            scale: isCurrent ? [1, 1.1, 1] : 1,
            opacity: isCompleted ? 1 : isCurrent ? 0.9 : 0.5,
          }}
          transition={{
            duration: 0.5,
            repeat: isCurrent ? Infinity : 0,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
        >
          {isCompleted ? <FaCheckCircle /> : <FaCircle />}
        </ProgressDot>
      );
    });
  };

  return (
    <AnimatePresence>
      <TrackerContainer
        as={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassPanel>
          <StatsContainer>
            <StatItem>
              <StatValue>
                <StatIcon $color="#e74c3c">
                  <FaFire />
                </StatIcon>
                <span>{focusInCycle}/4</span>
              </StatValue>
              <StatLabel>Current Cycle</StatLabel>
            </StatItem>

            <Divider />

            <StatItem>
              <StatValue>
                <StatIcon $color="#f39c12">
                  <FaTrophy />
                </StatIcon>
                <span>{currentCycle}</span>
              </StatValue>
              <StatLabel>Cycle Number</StatLabel>
            </StatItem>

            <Divider />

            <StatItem>
              <StatValue>
                <StatIcon $color="#3498db">
                  <FaChartLine />
                </StatIcon>
                <span>{totalCompleted}</span>
              </StatValue>
              <StatLabel>Total Focus</StatLabel>
            </StatItem>
          </StatsContainer>

          <ProgressContainer>
            <ProgressLabel>Cycle Progress</ProgressLabel>
            <ProgressDotsContainer>
              {renderSessionIndicators()}
            </ProgressDotsContainer>
          </ProgressContainer>
        </GlassPanel>
      </TrackerContainer>
    </AnimatePresence>
  );
};

export default Tracker;

const TrackerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem auto 2.5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem auto 2rem;
  }
`;

const GlassPanel = styled.div`
  background: rgba(40, 40, 40, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1.2rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 55rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
    max-width: 90%;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StatValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StatIcon = styled.div`
  color: ${(props) => props.$color || "#e74c3c"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 4rem;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    height: 3.5rem;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const ProgressLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProgressDotsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

const ProgressDot = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  position: relative;
  color: ${(props) =>
    props.$completed
      ? "#2ecc71"
      : props.$current
      ? "#e74c3c"
      : "rgba(255, 255, 255, 0.3)"};

  ${(props) =>
    props.$current &&
    `
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border-radius: 50%;
      border: 2px solid #e74c3c;
      animation: pulse 2s infinite;
    }
  `}

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.6rem;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }
`;
