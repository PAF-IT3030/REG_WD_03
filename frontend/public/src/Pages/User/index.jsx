import React, { useEffect, useState } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import PostAdd from "../../Components/PostAdd";
import UserProfile from "./user-profile";
import SharedPosts from "../SharedPosts";
import Modal from 'react-modal';
import Profile from "../Profile";


Modal.setAppElement('div');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function User() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const [postOptionSelected, setPostOptionSelected] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (user.userId) {
      dispatch(getPostsByUserId(user.userId));
    }

  }, [dispatch, user.userId]);


  // when open the model body scroll should be hidden
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);
  return (
    <div className="bg-[#5ea885]">
      <div className="container pt-5 pb-5 row">
        <div className="flex justify-center">
          <div className="w-full max-w-screen-sm space-y-5">
            <UserProfile openModal={openModal} />
            <PostAdd />
            <div>
              <nav>
                <div id="nav-tab" role="tablist" className="flex w-full rounded-md overflow-hidden">
                  <button
                    className={`p-2 ${postOptionSelected ? "text-blue-500 w-full bg-gray-500" : "w-full bg-gray-200"}`}
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                    onClick={() => setPostOptionSelected(true)}
                  >
                    POSTS
                  </button>
                  <button
                    className={`p-2 ${!postOptionSelected ? "text-blue-500 w-full bg-gray-500" : "w-full bg-gray-200"}`}
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    onClick={() => setPostOptionSelected(false)}
                  >
                    SHARED POSTS
                  </button>
                </div>
              </nav>
              <div className="" id="nav-tabContent">
                {postOptionSelected ? (
                  <div
                    className="space-y-4"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <h3 className="text-2xl font-bold pt-4">POSTS</h3>
                    <hr />
                    <Posts posts={post.posts} fetchType="GET_ALL_USER_POSTS" />
                  </div>
                ) : (
                  <div
                    className="space-y-4"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <h3 className="text-2xl font-bold pt-4">SHARED POSTS</h3>
                    <hr />
                    <SharedPosts />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-2">
          <Profile closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default User;
