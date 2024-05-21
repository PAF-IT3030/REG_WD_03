import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { MdDoneOutline } from "react-icons/md";
import UserImage from "../../assets/user.jpeg";
import {
  getPosts,
  getPostsByUserId,
} from "../../app/actions/post.actions";
import {
  deleteCommentById,
  updateCommentById,
} from "../../app/actions/comment.actions";

function Comment({ postId, comment, postUserId, fetchType }) {
  const dispatch = useDispatch();
  const [commentEditable, setCommentEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [text, setText] = React.useState(comment.text);

  const handleSubmitComment = async () => {
    const updatedComment = {
      id: comment.id,
      postId: postId,
      userId: user.userId,
      text: text,
    };
    dispatch(updateCommentById(updatedComment));
    if (fetchType === "GET_ALL_POSTS") {
      await dispatch(getPosts());
    }
    if (fetchType === "GET_ALL_USER_POSTS") {
      await dispatch(getPostsByUserId(postUserId));
    }
    if (fetchType === "GET_ALL_POSTS_USER") {
      await dispatch(getPostsByUserId(postUserId));
    }
    setText(text);
    setCommentEditable(false);
  };

  return (
    //add border to comment
    <div key={comment.id} className={`flex items-center mb-2 border`}>
      <div className="flex-1">
        {commentEditable ? (
          <input
            type="text"
            className="w-full border rounded p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <div className="flex items-center mb-2 p-2">
            <img
              src={comment.profileImage ? comment.profileImage : UserImage}
              className="w-10 h-10 rounded-full mr-3"
              alt="Profile"
            />
            <strong className="font-bold mr-3">{comment.username}</strong>
            <span>{comment.text}</span>
          </div>
        )}
      </div>

      <div className="flex items-center">
        {commentEditable ? (
          <>
            <GiCancel
              className="cursor-pointer text-gray-600"
              size={25}
              onClick={() => {
                setCommentEditable(false);
              }}
            />
            <MdDoneOutline
              className="cursor-pointer text-green-600 ml-2"
              size={25}
              onClick={handleSubmitComment}
            />
          </>
        ) : (
          <>
            {user.userId === comment.userId && (
              <AiFillEdit
                className="cursor-pointer text-blue-600"
                size={25}
                onClick={() => {
                  setCommentEditable(true);
                }}
              />
            )}
            {(user.userId === comment.userId ||
              user.userId === postUserId) && (
                <AiFillDelete
                  className="cursor-pointer text-red-600 ml-2"
                  size={25}
                  onClick={async () => {
                    await dispatch(deleteCommentById(comment.id));
                    if (fetchType === "GET_ALL_POSTS") {
                      await dispatch(getPosts());
                    }
                    if (fetchType === "GET_ALL_USER_POSTS") {
                      await dispatch(getPostsByUserId(postUserId));
                    }
                    if (fetchType === "GET_ALL_POSTS_USER") {
                      await dispatch(getPostsByUserId(postUserId));
                    }
                  }}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
