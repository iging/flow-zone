import Backdrop from "./Backdrop";
import Container from "./Container";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose }) => {
  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <Backdrop />
          <Container isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
