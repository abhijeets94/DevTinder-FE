import axios, { type AxiosResponse } from "axios";
import { BASE_URL, type FeedUsers } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import type { RootState } from "../utils/appStore";
import { UserCard } from "./UserCard";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store: RootState) => store.connection);

  const fetchConnections = async () => {
    try {
      const connections: AxiosResponse = await axios.get(
        `${BASE_URL}/request/connections`,
        { withCredentials: true },
      );
      console.log({ connections: connections?.data?.data });
      const connectionList = connections?.data?.data;
      dispatch(addConnections(connectionList));
    } catch (e) {
      console.error("Error: " + e);
    }
  };

  useEffect(() => {
    void fetchConnections();
  }, []);
  if (!connections || !connections.length) return <div className="flex justify-center h-screen items-center mb-3 text-4xl"> No Connection found!</div>
    return (
      <>
      <div className="text-3xl flex justify-center mt-2">Connections</div>
        <div className="flex justify-center my-10">
          {connections?.map((user: FeedUsers) => (
            <UserCard key={user._id} user={user} isPreview={true} />
          ))}
        </div>
      </>
    );
};
