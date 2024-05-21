import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostShareById,
} from "../../app/actions/postshare.actions";
import UserImage from "../../assets/user.jpeg";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import FollowButton from "../NewUsersSuggest/FollowButton";
import { deletePostById } from "../../app/actions/post.actions";

function SharedPostCard({ post, fetchType, getPostShareByUserIdFunc }) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [captionEdit, setCaption] = useState(post.caption);

  const handleSubmit = async () => {
    try {
      const newPost = {
        id: post.id,
        caption: captionEdit,
      };
      if (newPost) {
        await dispatch(updatePostShareById(newPost));
      }

      // await dispatch(updatePostShareById(newPost));
      if (fetchType === "GET_ALL_POSTS_SHARED") {
        // await dispatch(getPostShareByUserId(user.userId));
        getPostShareByUserIdFunc(user.userId);
      }
      setCaption(captionEdit);
      setEditable(false);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  const getUserByIdFunc = (users, userId) => {
    const result = users.filter(function (el) {
      return el.id === userId;
    });

    return result ? result[0] : null; // or undefined
  };


  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            className="flex items-center text-gray-800 no-underline"
            to={`/user/${post.userId}`}
          >
            <img
              src={post.profileImage ? post.profileImage : UserImage}
              className="w-10 h-10 rounded-full mr-3"
              alt="Profile"
            />
            <span className="font-semibold">{post.username}</span>
          </Link>
          <FollowButton
            userDetails={getUserByIdFunc(user.users, post.userId)}
          />
        </div>
        {user.userId === post.userId && (
          <div className="flex space-x-3">
            {editable ? (
              <>
                <GiCancel
                  className="cursor-pointer"
                  size={25}
                  onClick={() => {
                    setEditable(false);
                  }}
                />
                <IoCheckmarkDoneSharp
                  className="cursor-pointer"
                  size={25}
                  onClick={handleSubmit}
                />
              </>
            ) : (
              <>
                <AiFillEdit
                  className="cursor-pointer"
                  size={25}
                  onClick={() => {
                    setEditable(true);
                  }}
                />
                <AiFillDelete
                  className="cursor-pointer"
                  size={25}
                  onClick={() => {
                    dispatch(deletePostById(post.id));
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
      <hr />
      <div className="mb-4">
        {!editable ? (
          <p>{post.caption}</p>
        ) : (
          <input
            type="text"
            className="w-full border rounded p-2 mb-3"
            value={captionEdit}
            onChange={(e) => setCaption(e.target.value)}
          />
        )}
      </div>
      <div className="mb-4">
        <Slider>
          {post.post?.imgLink &&
            post.post.imgLink.length &&
            post.post.imgLink.map((img, index) => (
              <div key={index}>
                {img.includes("mp4") ? (
                  <video controls className="w-full h-[30rem] object-cover mb-3">
                    <source src={img} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={img}
                    alt={`Post content ${index}`}
                    className="w-full h-[30rem] object-cover mb-3"
                  />
                )}
              </div>
            ))}
        </Slider>
      </div>
    </div >
  );
}

export default SharedPostCard;
