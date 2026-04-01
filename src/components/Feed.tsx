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
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      console.log({ res: res?.data });

      dispatch(addFeed(res?.data));
    } catch (er) {
      console.error("ERror: " + er);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (feed)
    return (
      <div className="grid grid-cols-3 gap-4">
        {feed?.map((user: FeedUsers) => (
          <UserCard user={user} />
        ))}
      </div>
    );
};
