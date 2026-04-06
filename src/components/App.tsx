import axios, { AxiosError, type AxiosResponse } from "axios";
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
  const  user  = useSelector((store: {user: {user: User}}) => store.user)
  console.log({user});
  
  const fetchUser = async () => {
    try {
        const user: AxiosResponse = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(user.data));
    } catch (e) {
      
      if((e as AxiosError).status === 401)
      navigate("/login")
      console.log(`Unable to login: ${e}`);
    }
  };

  useEffect(() => {
    if(!user?._id)
    void fetchUser();
  }, [user?._id]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
