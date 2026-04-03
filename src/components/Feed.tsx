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
  if (feed)
    return (
      <div className="justify-center my-10 gap-3 grid grid-cols-2">
        {feed?.map((user: FeedUsers) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    );
};
