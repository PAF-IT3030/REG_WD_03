import React from "react";
import { useSelector } from "react-redux";
import UserImage from "../../assets/user.jpeg";

function UserProfile({ openModal }) {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded p-5 flex gap-4 max-h-[250px] items-center">
        <div className="text-center">
          <img
            className="rounded-full w-[140px] h-[140px] object-cover"
            src={user?.profileImage ? user.profileImage : UserImage}
            alt="Profile"
          />
          <button
            className="text-blue-500 hover:text-yellow-400 p-2 rounded-md mt-2"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Username:</p>
            <p className="">{user?.username ? user.username : "N/A"}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Email:</p>
            <p className="">{user?.email ? user.email : "N/A"}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Contact Number:</p>
            <p className="">{user?.contactNumber ? user.contactNumber : "N/A"}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Country:</p>
            <p className="">{user?.country ? user.country : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
