import Posts from "./Posts";

import classes from "../../styles/Community/index.module.scss";
import { useState } from "react";
import Modal from "../utils/Modal";
import MakePost from "./Posts/Post/makePost";

type Props = {
  posts: [];
};

function Community(props: Props) {
  const [showCreatePost, toggleCreatePost] = useState(false);
  const [data, setData] = useState("");

  const handleSendPost = () => {
    // hit create post api with post request
    console.log(data);
  };

  const createPost = (
    <Modal toggle={toggleCreatePost}>
      <MakePost
        isNew={true}
        sendPost={handleSendPost}
        name="Create a New Post"
        value={data}
        onChange={(data: any) => {
          setData(data);
        }}
      />
    </Modal>
  );
  return (
    <>
      {showCreatePost ? createPost : null}
      <h1 className={classes.community_header}>Community feed</h1>

      <button
        onClick={() => {
          toggleCreatePost(!showCreatePost);
        }}
        className={`${classes.btn} ${classes.pri_btn}`}
      >
        Make a new post
      </button>
      <Posts {...props} />

      <div
        onClick={() => {
          toggleCreatePost(!showCreatePost);
        }}
        className={`${classes.btn} ${classes.pri_btn} ${classes.floating_btn}`}
      >
        +
      </div>
    </>
  );
}

export default Community;
