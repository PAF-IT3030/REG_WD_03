import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostById,
  updatePostById,
  likePostById,
  getPosts,
  getPostsByUserId,
} from "../../app/actions/post.actions";
import { getAllUsers } from "../../app/actions/user.actions";

import { saveNotification } from "../../app/actions/notification.action";

// import { getPostToShareById } from "../../app/slices/post.slice";
import { saveComment } from "../../app/actions/comment.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UserImage from "../../assets/user.jpeg";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import Comment from "../Comment";
import SharePostForm from "../SharePostForm";
import { Link } from "react-router-dom";
import { getPostShareByUserId } from "../../app/actions/postshare.actions";
import FollowButton from "../NewUsersSuggest/FollowButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement("div");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const getUserByIdFunc = (users, userId) => {
  const result = users.filter(function (el) {
    return el.id === userId;
  });

  return result ? result[0] : null; // or undefined
};

function PostCard({ post, fetchType }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postShare, setPostShare] = useState({});
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [captionEdit, setCaption] = useState(post.caption);
  const [imgLinkEdit, setImgLinkEdit] = useState(post.imgLink);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  function openModal(ob) {
    setPostShare(ob)
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (post.likedby && post.likedby.length) {
      const userIdIndex = post.likedby.indexOf(user.userId);

      if (userIdIndex > -1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [post.likedby, user]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPosts());
    }, 4000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmitComment = async () => {
    const newComment = {
      postId: post.id,
      userId: user.userId,
      text: comment,
    };
    await dispatch(saveComment(newComment));

    const newNotification = {
      message: "Commented by " + user.user.username + " on your post",
      userId: post.userId,
    };

    await dispatch(saveNotification(newNotification));
    if (fetchType === "GET_ALL_POSTS") {
      await dispatch(getPosts());
    }
    if (fetchType === "GET_ALL_USER_POSTS") {
      await dispatch(getPostShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_POSTS_USER") {
      await dispatch(getPostShareByUserId(post.userId));
    }
    setComment("");
  };

  const handleSubmit = async () => {
    const newPost = {
      id: post.id,
      userId: user.userId,
      caption: captionEdit,
      imgLink: imgLinkEdit,
    };
    await dispatch(updatePostById(newPost));
    if (fetchType === "GET_ALL_POSTS") {
      await dispatch(getPosts());
    }
    if (fetchType === "GET_ALL_USER_POSTS") {
      await dispatch(getPostShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_USER_POSTS") {
      await dispatch(getPostsByUserId(user.userId));
    }
    setEditable(false);
  };

  const uploadImage = (e) => {
    const files = e.target.files;

    if (files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    // upload up to 4 images
    const maxImages = 4;
    const numImages = Math.min(maxImages, files.length);

    for (let i = 0; i < numImages; i++) {
      const file = files[i];
      const storageRef = ref(storage, `/posts/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgLinkEdit((prevLinks) => [...prevLinks, url]);
          });
        }
      );
    }
  };

  const handleLikePost = async () => {
    const tempLikeArray = post.likedby ? post.likedby.slice() : [];
    const userId = user.userId.toString();
    const userIdIndex = tempLikeArray.indexOf(userId);

    if (userIdIndex > -1) {
      tempLikeArray.splice(userIdIndex, 1);
      setIsLiked(false);
    } else {
      tempLikeArray.push(userId);
      setIsLiked(true);
    }

    const likedPost = {
      id: post.id,
      likedby: tempLikeArray,
    };

    await dispatch(likePostById(likedPost));
    if (fetchType === "GET_ALL_POSTS") {
      await dispatch(getPosts());
    }
    if (fetchType === "GET_ALL_USER_POSTS") {
      await dispatch(getPostsByUserId(post.userId));
      await dispatch(getPostShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_POSTS_USER") {
      await dispatch(getPostsByUserId(post.userId));
      await dispatch(getPostShareByUserId(post.userId));
    }
    const newNotification = {
      message: "Like by " + user.user.username + " on your post",
      userId: post.userId,
    };

    await dispatch(saveNotification(newNotification));
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
          {imgLinkEdit &&
            imgLinkEdit.length &&
            imgLinkEdit.map((img, index) => (
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
        {editable && (
          <input
            type="file"
            className="w-full border rounded p-2 mb-3"
            onChange={uploadImage}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div onClick={handleLikePost} className="cursor-pointer">
            {isLiked ? (
              <AiFillLike size={25} />
            ) : (
              <AiOutlineLike size={25} />
            )}
          </div>
          <AiOutlineComment size={25} className="cursor-pointer" />
          <TbShare3 size={25}
            onClick={() => openModal(post)}
            className="cursor-pointer"
          />
        </div>
        <div className="text-gray-600">
          {post.likedby ? post.likedby.length : 0} likes
        </div>
      </div>
      <hr />
      <div className="flex items-center mt-4">
        <img
          src={user.profileImage ? user.profileImage : UserImage}
          className="w-8 h-8 rounded-full mr-2"
          alt="Profile"
        />
        <input
          type="text"
          className="w-full border rounded p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleSubmitComment}
          className="ml-2 bg-blue-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!comment}
        >
          <MdSend size={25} />
        </button>

      </div>
      {post.comments && post.comments.length ? (
        <div className="mt-4 max-h-40 overflow-y-auto">
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Share Post Modal"
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Share Post</h2>
          <SharePostForm post={post} closeModal={closeModal} postShare={postShare} />
          <button
            className="mt-4 bg-red-500 text-white p-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PostCard;
