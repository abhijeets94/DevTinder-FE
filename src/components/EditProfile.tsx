import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { BASE_URL, type FeedUsers } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

interface EditProfileInterfaceProps {
  user: FeedUsers;
}

export const EditProfile = ({ user }: EditProfileInterfaceProps) => {
  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);
  const [age, setAge] = useState<string>(user?.age);
  const [gender, setGender] = useState<string>(user?.gender);
  const [about, setAbout] = useState<string>(user?.about);
  const [photoUrl, setPhotoUrl] = useState<string>(user?.photoUrl);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const { firstName, lastName, age, gender, about, photoUrl } = user;
      setFirstName(firstName);
      setLastName(lastName);
      setAge(age);
      setGender(gender);
      setPhotoUrl(photoUrl);
      setAbout(about);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      await axios
        .patch(
          `${BASE_URL}/profile/edit`,
          { firstName, lastName, age, gender, photoUrl, about },
          { withCredentials: true },
        )
        .then((user: AxiosResponse) => {
          console.log({ user: user.data });
          dispatch(addUser(user.data));
        });
      setError("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (e) {
      const errorMessage =
        ((e as AxiosError)?.response?.data as { message: string })?.message ||
        "Bad credentials";
      setError(errorMessage);
      console.error("Unable to patch : ", e);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-2 m-5">
      <div className="flex justify-center my-10">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="flex gap-3 flex-col">
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First name"
                className="input"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last name"
                className="input"
              />
              <input
                type="text"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                placeholder="Age"
                className="input"
              />
              <input
                type="text"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                placeholder="Gender"
                className="input"
              />
              <input
                type="text"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                placeholder="About"
                className="input"
              />
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                }}
                placeholder="Photo Url"
                className="input"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-center mt-2">
              <button
                className={`btn ${success ? "btn-success" : "btn-primary"} w-full`}
                onClick={handleSubmit}
              >
                {`Submit${success ? "ted ✅" : ""}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, about, photoUrl }}
        isPreview={true}
      />
    </div>
  );
};
