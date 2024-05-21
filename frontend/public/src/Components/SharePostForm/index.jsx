import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePostShare } from "../../app/actions/postshare.actions";

function SharePostForm(props) {
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.post.selectedPost);
  const userId = useSelector((state) => state.user.userId);
  const [caption, setCaption] = React.useState();

  console.log(props.postShare);

  const handleSubmit = () => {
    const postShare = {
      caption: caption,
      userId: userId,
      post: props.postShare,
    }
    dispatch(savePostShare(postShare));
    props.closeModal()
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <label className="text-gray-700 font-bold" htmlFor="caption">
        Add a caption you want to share with this post
      </label>
      <input
        type="text"
        className="px-3 py-2 border border-gray-300"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handleSubmit}
      >
        SHARE
      </button>
    </div>
  );
}

export default SharePostForm;
