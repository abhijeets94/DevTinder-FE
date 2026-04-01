import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL, type User } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }  = useSelector((store: {user: {user: User}}) => store.user)
  const fetchUser = async () => {
    try {
        const user = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(user));
    } catch (e) {
      
      if((e as AxiosError).status === 401)
      navigate("/login")
      console.log(`Unable to login: ${e}`);
    }
  };

  useEffect(() => {
    if(!user?.data?._id)
    void fetchUser();
  }, [user?.data?._id]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
