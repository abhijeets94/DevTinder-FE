import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailId(e.target.value);
  };
  const handlePasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
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
      if (result?.data) {
        dispatch(addUser(result.data));
        return navigate("/")
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">DevTinder</h2>
          <div className="flex gap-3 flex-col">
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
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
