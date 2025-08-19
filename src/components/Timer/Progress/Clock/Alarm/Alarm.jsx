import styled from "styled-components";
import { useEffect, useContext, useRef } from "react";
import { FaBell, FaCheck } from "react-icons/fa";
import alarmSoundOne from "/alarm.mp3";
import alarmSoundTwo from "/alarm-2.mp3";
import { StateContext } from "../../../../../context/GlobalContext";
import { motion } from "framer-motion";

const Alarm = () => {
  const {
    audio,
    setAudio,
    showSnooze,
    setShowSnooze,
    setIsActive,
    activeTag,
    setActiveTag,
    setShowAlarm,
    setFocusSessionActive,
    completedSessions,
    setCompletedSessions,
    shouldAutoSwitchMode,
  } = useContext(StateContext);

  const audioAttemptRef = useRef(false);

  // Handle visibility change to ensure audio plays when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      // If the page becomes visible and we have audio but it's not playing, try playing it
      if (
        document.visibilityState === "visible" &&
        audio &&
        audio.paused &&
        !audioAttemptRef.current
      ) {
        audioAttemptRef.current = true;

        // Try to play audio - browsers often block autoplay until user interaction
        audio.play().catch(() => {
          // If audio fails to play (e.g., no user interaction yet), we'll retry when they interact
          console.log("Audio playback blocked - waiting for user interaction");
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also attempt to play on first render
    if (document.visibilityState === "visible" && !audioAttemptRef.current) {
      audioAttemptRef.current = true;
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [audio]);

  useEffect(() => {
    let newAudio;
    if (activeTag === 0) {
      newAudio = new Audio(alarmSoundTwo);
    } else if (activeTag === 1 || activeTag === 2) {
      newAudio = new Audio(alarmSoundOne);
    }

    if (newAudio) {
      newAudio.loop = true;

      // Try to play, but don't worry if it fails (will retry on user interaction)
      const playPromise = newAudio.play();
      if (playPromise) {
        playPromise.catch(() => {
          console.log(
            "Audio playback initially blocked - will retry when user interacts"
          );
        });
      }

      setAudio(newAudio);

      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [setAudio, activeTag]);

  // Add event listener for any user interaction to try playing audio
  useEffect(() => {
    const tryPlayAudio = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            // Remove the event listener once audio plays successfully
            document.removeEventListener("click", tryPlayAudio);
            document.removeEventListener("keydown", tryPlayAudio);
            document.removeEventListener("touchstart", tryPlayAudio);
          })
          .catch((error) => {
            console.log("Still unable to play audio:", error);
          });
      }
    };

    document.addEventListener("click", tryPlayAudio);
    document.addEventListener("keydown", tryPlayAudio);
    document.addEventListener("touchstart", tryPlayAudio);

    return () => {
      document.removeEventListener("click", tryPlayAudio);
      document.removeEventListener("keydown", tryPlayAudio);
      document.removeEventListener("touchstart", tryPlayAudio);
    };
  }, [audio]);

  const handleSnooze = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setShowSnooze(false);
    setShowAlarm(false);

    // If focus mode just completed, increment sessions counter and switch to appropriate break
    if (activeTag === 0 && shouldAutoSwitchMode) {
      // Increment completed sessions
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      // Determine which break to switch to
      // After every 4 focus sessions, take a long break, otherwise take a short break
      const nextMode = newCompletedSessions % 4 === 0 ? 2 : 1;
      setActiveTag(nextMode);

      // Reset timer to appropriate break duration
      if (nextMode === 1) {
        // Will be handled by useEffect in StateProvider
      } else {
        // Will be handled by useEffect in StateProvider
      }
    } else if ((activeTag === 1 || activeTag === 2) && shouldAutoSwitchMode) {
      // After break is done, switch back to focus mode
      setActiveTag(0);
    }

    // Setup timer based on the new mode (will be handled by the useEffect in StateProvider)
    setIsActive(false);

    // Reset focus session active state when alarm is dismissed
    setFocusSessionActive(false);
  };

  return (
    <AlarmOverlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AlarmContainer
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <AlarmMessage>
          <PulsingIcon>
            <FaBell />
          </PulsingIcon>
          <AlarmText>Time&apos;s up!</AlarmText>
        </AlarmMessage>

        {showSnooze && (
          <ButtonsContainer>
            <DismissButton
              onClick={handleSnooze}
              as={motion.button}
              whileHover={{ scale: 1.05, backgroundColor: "#2ecc71" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCheck /> Dismiss
            </DismissButton>
          </ButtonsContainer>
        )}
      </AlarmContainer>
    </AlarmOverlay>
  );
};

export default Alarm;

const AlarmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
`;

const AlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(231, 76, 60, 0.15);
  backdrop-filter: blur(5px);
  padding: 1.5rem 2rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(231, 76, 60, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 25rem;
`;

const AlarmMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const pulse = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const PulsingIcon = styled.div`
  ${pulse}
  font-size: 3.5rem;
  color: #e74c3c;
  animation: pulse 1.5s infinite ease-in-out;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const AlarmText = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const DismissButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  background-color: rgba(46, 204, 113, 0.8);
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 0.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  svg {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;

    svg {
      font-size: 1.6rem;
    }
  }
`;
