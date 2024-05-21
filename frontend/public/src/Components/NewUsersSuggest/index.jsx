import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../app/actions/user.actions";
import UserImage from "../../assets/user.jpeg";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

function NewUsersSuggest() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersList(user.users);
  }, [user.users]);

  return (
    <div className="bg-white p-3 w-full rounded shadow-md h-[100%] overflow-auto">
      <h5 className="font-semibold mb-3">People you may know...</h5>
      {user &&
        usersList.length > 0 &&
        [...usersList]
          .reverse()
          .slice()
          .map((userItem) => {
            return (
              <div className="w-full mt-3" key={userItem.id}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between w-full gap-4">
                    <Link
                      className="flex items-center text-gray-800 no-underline"
                      to={`/user/${userItem.id}`}
                    >
                      <img
                        src={
                          userItem.profileImage
                            ? userItem.profileImage
                            : UserImage
                        }
                        className="w-10 h-10 rounded-full mr-3"
                        alt="Profile"
                      />
                      <span className="font-semibold max-w-[120px] overflow-hidden">
                        {userItem.username}
                      </span>
                    </Link>
                    <div className="">
                      <FollowButton userDetails={userItem} fetchType="SUGGESTION" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default NewUsersSuggest;
