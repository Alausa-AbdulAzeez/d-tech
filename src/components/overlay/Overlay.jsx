import "./overlay.css";
import React, { useEffect } from "react";

const Overlay = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Disable scrolling when the overlay is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClick = (e) => {
    // Check if the click target is the overlay background
    if (e.target.classList.contains("overlayy")) {
      onClose();
    }
  };

  return (
    <div className="overlay__container" onClick={handleClick}>
      <div className="overlay overlayy"></div>
      <div className="children">{children}</div>
    </div>
  );
};

export default Overlay;
