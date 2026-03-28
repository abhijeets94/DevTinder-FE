import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { Footer } from "./Footer";

const App = () => {
  return (
    <>
      <NavBar />
     <Outlet/>
     <Footer/>
    </>
  );
};

export default App;
