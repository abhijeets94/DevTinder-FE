import axios from "axios";
import { BASE_URL, type FeedUsers } from "../utils/constants"
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { removeFeedUser } from "../utils/feedSlice";

export const UserCard = ({user, isPreview = false, isRequest = false, requestId = ""}: {user: FeedUsers | undefined, isPreview?: boolean, isRequest?: boolean, requestId?: string} ) => {
  const dispatch = useDispatch();
  const handleRequestResponse = async (status: string, requestType: "review" | "send") => {
    try {
       await axios.post(`${BASE_URL}/request/${requestType}/${status}/${requestType === "review" ? requestId : user?._id }`, {}, {withCredentials: true});
      if(requestType === "review") {
        dispatch(removeRequest(requestId));
      } else {
        dispatch(removeFeedUser(user?._id));
      }
      
    } catch (e) {
      console.error('Error: ' + e);
    }
  }
    return (
         <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user?.photoUrl ?? "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt="Devtinder User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        { user?.age && <h3 className="card-title">{`${user?.age} YO,`}</h3>}
        { user?.gender && <h4 className="card-title">{`${user?.gender}`}</h4>}
        <p>
          {user?.about}
        </p>
       {(!isPreview && !isRequest) && <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleRequestResponse("ignored", "send")}>Ignore</button>
          <button className="btn btn-secondary " onClick={() => handleRequestResponse("interested", "send")}>Interested</button>
        </div>}
       {(!isPreview && isRequest) && <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleRequestResponse("rejected", "review")}>Reject</button>
          <button className="btn btn-secondary" onClick={() => handleRequestResponse("accepted", "review")}>Accept</button>
        </div>}
      </div>
    </div>
    )
}