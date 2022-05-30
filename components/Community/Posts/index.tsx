import React from "react";
import Post from "./Post";

import classes from "../../../styles/Community/Posts.module.scss";

type Props = {
    posts: []
}

export default function Posts(props: Props) {
  const posts = ["1", "2", "1", "2", "1", "2"];

//   console.log(props.posts)
  return (
    <section className={classes.posts}>
      {props.posts.map((el, id) => {
        return <Post key={id} post={el}/>;
      })}
    </section>
  );
}
