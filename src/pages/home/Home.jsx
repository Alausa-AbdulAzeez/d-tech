import { Navbar, Profile } from "../../components";
import "./home.css";

const Home = () => {
  return (
    <div className="app__container home">
      <Navbar />
      <Profile />
    </div>
  );
};

export default Home;
