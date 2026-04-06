import { useState } from "react";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };
  const handlePasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFirstNameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const result: { data: string } = await axios.post(
        `${BASE_URL}/login`,
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true },
      );
      console.log({ result });

      if (result?.data) {
        dispatch(addUser(result.data));
        return navigate("/");
      }
    } catch (e) {
      const errorMessage =
        ((e as AxiosError)?.response?.data as { message: string })?.message ||
        "Bad credentials";
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleSignup = async() => {
    try {
      const res: AxiosResponse = await axios.post(`${BASE_URL}/signup`, {firstName, lastName, email: emailId, password}, {withCredentials: true});
      console.log({resSignUp: res?.data});
      
      dispatch(addUser(res?.data));


      navigate("/profile");
    } catch (e) {
      console.log("Error sign up: " + e)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">DevTinder</h2>
          <div className="flex gap-3 flex-col">
            {!isLogin && <input
              type="text"
              value={firstName}
              onChange={handleFirstNameTextChange}
              placeholder="First name"
              className="input"
            />}
           {!isLogin && <input
              type="text"
              value={lastName}
              onChange={handleLastNameTextChange}
              placeholder="Last name"
              className="input"
            />}
            <input
              type="text"
              value={emailId}
              onChange={handleEmailTextChange}
              placeholder="Enter email Id"
              className="input"
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordTextChange}
              placeholder="Enter password"
              className="input"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary w-full" onClick={ isLogin ? handleLogin : handleSignup}>
              { isLogin ? "Login" : "Sign-up"}
            </button>
            <div className="flex cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New user? Sign up" : "Existing user? Login" }</div>
          </div>
        </div>
      </div>
    </div>
  );
};
