import React, { useEffect, useState } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import NewUsersSuggest from "../../Components/NewUsersSuggest";
import { useNavigate } from "react-router-dom";
import StoryAdd from "../../Components/StoryAdd";
import Modal from 'react-modal';
import { STORYAPI } from "../../app/apis/story.api";
import StoryView from "../../Components/StoryView";
import { getPosts } from "../../app/actions/post.actions";


Modal.setAppElement('div');
const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

  },
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.post);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [story, setStory] = useState({});//[{}
  const [storys, setStorys] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openStory(story) {
    setIsStoryOpen(true);
    setStory(story);
  }

  function closeStory() {
    setIsStoryOpen(false);
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const fetchStorys = async () => {
    try {
      const response = await STORYAPI.getStorys();
      setStorys(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStorys();
  }, []);

  if (!sessionStorage.getItem("Authorization")) {
    navigate("/login");
  }


  console.log(storys);

  return (
    <div className="bg-[#5ea885] min-h-[calc(100vh-4.7rem)] max-h-[calc(100vh-4.7rem)] overflow-auto">
      <div className="container">

        <h1 className="text-2xl font-bold text-white py-4">Feed</h1>
        <div className="flex items-center gap-4">
          <button
            className="rounded-full bg-white text-[#5ea885] font-semibold min-h-[60px] min-w-[60px] flex items-center justify-center hover:bg-[#f0f0f0] focus:outline-none focus:ring-2 focus:ring-[#5ea885] focus:ring-offset-2 focus:ring-offset-[#5ea885]"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <div>
            <div className="flex flex-row gap-4 w-full overflow-auto">
              {storys.map((story, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => openStory(story)}
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-full overflow-hidden bg-white min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] ">
                      {story.imgLink &&
                        story.imgLink.length &&
                        story.imgLink.map((img, index) => (
                          <div key={index}>
                            {img.includes("mp4") ? (
                              <video controls className="object-cover w-full h-full">
                                <source src={img} type="video/mp4" />
                              </video>
                            ) : (
                              <img
                                src={img}
                                alt={`Post content ${index}`}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                        ))}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="md:col-span-2">
            <Posts posts={post.posts} fetchType="GET_ALL_POSTS" />
          </div>
          <div>
            <NewUsersSuggest />
          </div>

        </div>
      </div>
      <Modal
        isOpen={isStoryOpen}
        onRequestClose={closeStory}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-2">
          <StoryView
            closeStory={closeStory}
            fetchStorys={fetchStorys}
            story={story}
          />
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-2">
          <StoryAdd closeModal={closeModal} fetchStorys={fetchStorys} />
        </div>
      </Modal>
    </div>
  );
}

export default Home;
