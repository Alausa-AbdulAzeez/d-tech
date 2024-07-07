import { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("Personal details"))
  );

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("Personal details")));
  }, [localStorage.getItem("Personal details")]);

  return (
    <nav className="navbar">
      <h2 className="nav__logo">D-Tech</h2>
      <div className="nav__profile__container">
        <div className="nav__profile__container__left">AA</div>
        <div className="nav__profile__container__right">
          <h3 className="nav__profile__container__right__top">
            {userDetails?.firstname && userDetails.surname
              ? `${userDetails?.firstname} ${userDetails.surname}`
              : "Username"}{" "}
          </h3>
          <p className="nav__profile__container__right__bottom">
            Software developer
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
