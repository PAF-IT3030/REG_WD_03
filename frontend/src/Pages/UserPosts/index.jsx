import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import { getPostShareByUserId } from "../../app/actions/postshare.actions";
import Posts from "../../Components/Posts";
import SharedPostsList from "../../Components/SharedPostsList";

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postshare = useSelector((state) => state.postshare);
  const [postOptionSelected, setPostOptionSelected] = React.useState(true);




  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
      dispatch(getPostShareByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-sm">
          <nav className="p-4">
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
          <div className="p-4" id="nav-tabContent">
            {postOptionSelected ? (
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <h3>POSTS</h3>
                <hr />
                <Posts posts={post.posts} fetchType="GET_ALL_POSTS_USER" />
              </div>
            ) : (
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <h3>SHARED POSTS</h3>
                <hr />
                <SharedPostsList
                  posts={postshare.posts}
                  fetchType="GET_ALL_POSTS_USER"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
