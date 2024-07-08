import { useContext } from "react";
import "./navbar.css";
import { UserContext } from "../../pages/home/Home";

const Navbar = () => {
  const { userDetails } = useContext(UserContext);

  let firstname, surname, jobtitle;

  if (userDetails) {
    ({ firstname, surname, jobtitle } = userDetails);
  }
  return (
    <nav className="navbar">
      <h2 className="nav__logo">D-Tech</h2>
      <div className="nav__profile__container">
        <div className="nav__profile__container__left">
          {firstname && surname
            ? `${firstname?.[0]?.toUpperCase()}${surname?.[0]?.toUpperCase()}`
            : "U"}
        </div>
        <div className="nav__profile__container__right">
          <h3 className="nav__profile__container__right__top">
            {firstname && surname ? `${firstname} ${surname}` : "Username"}
          </h3>
          {jobtitle && (
            <p className="nav__profile__container__right__bottom">{jobtitle}</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
