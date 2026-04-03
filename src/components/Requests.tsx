import axios, { type AxiosResponse } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { BASE_URL, type FeedUsers } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { UserCard } from "./UserCard";

export const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store: RootState) => store.request);

  const fetchRequest = async () => {
    try {
      const requests: AxiosResponse = await axios.get(
        `${BASE_URL}/request/received`,
        { withCredentials: true },
      );
      console.log({ request: requests?.data?.data });
      const requestList = requests?.data?.data;
      dispatch(addRequest(requestList));
    } catch (e) {
      console.error("Error: " + e);
    }
  };

  useEffect(() => {
    void fetchRequest();
  }, []);
  if (!request || !request.length) return <div className="flex justify-center h-screen items-center mb-3 text-4xl"> No Request found!</div>
    return (
      <>
      <div className="text-3xl flex justify-center mt-2">Request</div>
        <div className="flex justify-center my-10 gap-3">
          {request?.map((user) => {
            return (
            <UserCard key={user._id} user={user?.fromUserId} isRequest={true} requestId={user?._id} />
          )})}
        </div>
      </>
    );
};
