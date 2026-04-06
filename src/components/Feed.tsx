import axios from "axios";
import { BASE_URL, type FeedUsers } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import type { RootState } from "../utils/appStore";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed: Array<FeedUsers> | null = useSelector(
    (store: RootState) => store.feed,
  );
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      
      dispatch(addFeed(res?.data?.data));
    } catch (er) {
      console.error("ERror: " + er);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  console.log({lengt: feed});
  
  if (!feed || feed?.length === 0) return <div>Nothing to show here!</div>
    return (
      <div className="flex justify-center my-10 gap-3">
        <UserCard key={feed?.[0]._id} user={feed[0]} />
      </div>
    );
};
