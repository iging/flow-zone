import styled from "styled-components";
import { motion } from "framer-motion";

const Backdrop = () => {
  return (
    <BackdropStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default Backdrop;

const BackdropStyled = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(3px);
  -webkit-tap-highlight-color: transparent;
`;
