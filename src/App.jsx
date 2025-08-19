import styled from "styled-components";
import Tags from "./components/Tags/Tags";
import Timer from "./components/Timer/Timer";
import logo from "/img/logo-optimized.svg";
import Modal from "./components/Modal/Modal";
import { useEffect, useContext } from "react";
import { FaCog } from "./icons";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { StateContext } from "./context/GlobalContext";
import Task from "./components/Task/Task";
import Tracker from "./components/Tracker/Tracker";
import { motion } from "framer-motion";

function App() {
  const { isOpen, setIsOpen, isLoading, setIsLoading } =
    useContext(StateContext);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} />
      <Header
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoContainer>
          <Logo
            src={logo}
            alt="Flow Zone Logo"
            as={motion.img}
            width="60"
            height="60"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </LogoContainer>
        <Title
          as={motion.h1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Flow Zone
        </Title>
      </Header>
      <Tags />
      <Timer />
      <Tracker />
      <Task />
      <SettingsIcon
        onClick={onOpen}
        as={motion.button}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        aria-label="Open settings"
      >
        <FaCog />
      </SettingsIcon>
      <About />
      <Footer />
    </>
  );
}

export default App;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0 2rem;
  position: relative;
  margin-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 20rem;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(231, 76, 60, 0.5),
      transparent
    );
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 2rem 0 1rem;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  margin-right: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(231, 76, 60, 0.3) 0%,
      transparent 70%
    );
    z-index: -1;
    filter: blur(8px);
    opacity: 0.7;
  }
`;

const Logo = styled.img`
  width: 6rem;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(231, 76, 60, 0.3));

  @media (max-width: 768px) {
    width: 4.5rem;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #e74c3c, #ffffff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(231, 76, 60, 0.2);
  letter-spacing: 1px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const SettingsIcon = styled.button`
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background-color: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2.4rem;
  z-index: 100;
  border: none;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (max-width: 768px) {
    bottom: 2rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    font-size: 2rem;
  }
`;
