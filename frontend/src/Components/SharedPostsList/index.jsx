import React, { useEffect, useState } from "react";
import SharedPostCard from "../SharedPostCard";
import { useDispatch, useSelector } from "react-redux";
import { POSTSHAREAPI } from "../../app/apis/postshare.api";

function SharedPostsList({ fetchType }) {
  const dispatch = useDispatch();
  const [postsList, setPostsList] = useState([]);
  const user = useSelector((state) => state.user);


  const getPostShareByUserIdFunc = async (id) => {
    try {
      const data = await POSTSHAREAPI.getPostShareByUserId(id);
      setPostsList(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      getPostShareByUserIdFunc(user.userId);
    }
  }, [dispatch, user, user.userId, fetchType]);





  return (
    <div>
      {postsList.length ? [...postsList].reverse().map((post) => {
        return <SharedPostCard key={post.id} post={post} fetchType={fetchType} getPostShareByUserIdFunc={getPostShareByUserIdFunc} />;
      }) : <h5>No shared posts yet...</h5>}
    </div>
  );
}

export default SharedPostsList;
