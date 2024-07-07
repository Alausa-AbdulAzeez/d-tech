import { ToastContainer } from "react-toastify";
import { Navbar, Profile } from "../../components";
import "./home.css";
import { createContext, useState } from "react";

// Create UserContext at the top level
const UserContext = createContext();
const Home = () => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("Personal details"))
  );

  const userContextValues = { userDetails, setUserDetails };

  return (
    <UserContext.Provider value={userContextValues}>
      <div className="app__container home">
        <Navbar />
        <Profile />
      </div>
    </UserContext.Provider>
  );
};

export default Home;
export { UserContext }; // Export UserContext for usage in other components
