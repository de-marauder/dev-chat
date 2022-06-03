import Posts from "./Posts";

import {useSession} from "next-auth/react"

import classes from "../../styles/Community/index.module.scss";
import { useState } from "react";
import Modal from "../utils/Modal";
import MakePost from "./Posts/Post/makePost";
import Router from "next/router";

type Props = {
  posts: [];
};

function Community(props: Props) {

  const [showCreatePost, toggleCreatePost] = useState(false);
  const [data, setData] = useState("");
  const [title, setTitle] = useState('')


  const {data: session} = useSession()

  const handleSendPost = async () => {
    // hit create post api with post request
    console.log(title);
    console.log(data);
    console.log(session?.user?.name);

    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: data,
        author: session?.user?.name,
      }),
    })

    const resJson = response.ok && await response.json()

    console.log("submit post complete: ", resJson)
    Router.push(`/community/post/${props.posts.length}`)
  };


  const createPost = (
    <Modal toggle={toggleCreatePost}>
      <MakePost
        isNew={true}
        sendPost={handleSendPost}
        name="Create a New Post"
        value={data}
        title={title}
        setTitle={setTitle}
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

      {session && <button
        onClick={() => {
          toggleCreatePost(!showCreatePost);
        }}
        className={`${classes.btn} ${classes.pri_btn}`}
      >
        Make a new post
      </button>}
      <Posts {...props} />

      {session && <div
        onClick={() => {
          toggleCreatePost(!showCreatePost);
        }}
        className={`${classes.btn} ${classes.pri_btn} ${classes.floating_btn}`}
      >
        +
      </div>}
    </>
  );
}

export default Community;
