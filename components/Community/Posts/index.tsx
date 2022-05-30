import React from "react";
import Post from "./Post";

import classes from "../../../styles/Community/Posts.module.scss";

type Props = {
    posts: []
}

export default function Posts(props: Props) {
  return (
    <section className={classes.posts}>
      {props.posts.map((el, id) => {
        return <Post key={id} post={el}/>;
      })}
    </section>
  );
}
