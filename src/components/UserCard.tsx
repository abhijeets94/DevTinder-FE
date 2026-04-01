import type { FeedUsers } from "../utils/constants"

export const UserCard = ({user}: {user: FeedUsers} ) => {
    return (
         <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user.photoUrl ?? "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt="Devtinder User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>
          {user.about}
        </p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary ">Interested</button>
        </div>
      </div>
    </div>
    )
}