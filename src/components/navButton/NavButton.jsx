import "./navButton.css";
import { Icon } from "@iconify/react";

const NavButton = ({ leftIcon, handleClick, rightIcon, text }) => {
  return (
    <button className="nav__button" onClick={handleClick}>
      {leftIcon && <Icon icon="iconamoon:player-previous-thin" />}
      <p>{text}</p>
      {rightIcon && <Icon icon="iconamoon:player-next-thin" />}
    </button>
  );
};

export default NavButton;
