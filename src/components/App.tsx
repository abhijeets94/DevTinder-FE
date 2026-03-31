import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { appStore } from "../utils/appStore";
import { Provider } from "react-redux"

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <NavBar />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
};

export default App;
