import { useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  const user  = useSelector((store: RootState) => store.user);
  
  if(user)
  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};
