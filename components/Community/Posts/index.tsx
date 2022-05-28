import React from "react";
import Post from "./Post";

import classes from "../../../styles/Community/Posts.module.scss";

export default function Posts() {
  const posts = ["1", "2"];
  return (
    <div className={classes.posts}>
      {posts.map((el, id) => {
        return <Post key={id} />;
      })}
    </div>
  );
}
