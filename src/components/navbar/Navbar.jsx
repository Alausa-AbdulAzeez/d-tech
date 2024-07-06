import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="nav__logo">D-Tech</h2>
      <div className="nav__profile__container">
        <div className="nav__profile__container__left">AA</div>
        <div className="nav__profile__container__right">
          <h3 className="nav__profile__container__right__top">
            Alusa
            AbdulazeezAbdulazeezAbdulazeezAbdulazeezAbdulazeezAbdulazeezAbdulazeez
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
