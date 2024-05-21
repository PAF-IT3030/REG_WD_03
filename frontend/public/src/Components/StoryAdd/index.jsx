import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorysByUserId, saveStory } from "../../app/actions/story.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";

function StoryAdd({ closeModal, fetchStorys }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [imgLink, setImgLink] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const story = {
      userId: user.userId,
      imgLink,
    };
    await dispatch(saveStory(story));
    await dispatch(getStorysByUserId(user.userId));
    setImgLink([]);
    fileInputRef.current.value = "";
    fetchStorys();
    closeModal();
  };

  const uploadImage = (e) => {
    const files = e.target.files;

    if (files.length === 0) {
      alert("Please upload at least one file!");
      return;
    }

    // upload up to 1 images or 1 video
    let numImages = 0;
    let numVideos = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("video/")) {
        if (numVideos === 0 && numImages === 0) {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            if (video.duration <= 30) {
              continueUpload(file);
            } else {
              alert("Video duration must be less than or equal to 30 seconds!");
              fileInputRef.current.value = "";
            }
          };
          video.src = URL.createObjectURL(file);
          numVideos++;
        } else {
          alert("Only 1 video file is allowed!");
          fileInputRef.current.value = "";
          return;
        }
      } else if (numImages < 1) {
        continueUpload(file);
        numImages++;
      } else {
        alert("Only up to 1 images are allowed!");
        fileInputRef.current.value = "";
        return;
      }
    }
  };

  const continueUpload = (file) => {
    const storageRef = ref(storage, `/story/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },

      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgLink((prevLinks) => [...prevLinks, url]);
          console.log(url);
        });
      }
    );
  };

  return (

    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-500 mb-4">*maximum 1 images or 1 video</p>
          <div className="mb-4">
            {imgLink.length > 0 && (
              <Slider
                className="border border-gray-300 rounded shadow-md bg-white p-2 mb-4"
              >
                {imgLink?.map((img, index) => (
                  <div key={index} className="mb-4">
                    {img.includes("mp4") ? (
                      <video
                        controls
                        className="w-full h-52 object-contain mb-4"
                      >
                        <source src={img} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={img}
                        className="w-full h-52 object-contain mb-4"
                        alt="Uploaded content"
                      />
                    )}
                  </div>
                ))}
              </Slider>
            )}
            <input
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => uploadImage(e)}
              ref={fileInputRef}
              multiple
              // IMAGES AND VIDEOS
              accept="image/*, video/*"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full"
            disabled={imgLink.length === 0}
          >
            Add Story
          </button>
        </form>
      </div>
    </div>

  );
}

export default StoryAdd;
