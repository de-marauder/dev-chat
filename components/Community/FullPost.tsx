import React, { useState, useEffect } from "react";

import classes from "../../styles/Community/FullPost.module.scss";
import MakePost from "./Posts/Post/makePost";


type Props = {
  post: {
    id: number;
    userId: number;
    title: string;
    body: string;
  };
  dateStr: string;
};

export default function FullPost(props: Props) {

  const [data, setData] = useState("");
  
  const handleSendPost = () => {
    // hit create post api with post request
    console.log(data)
  }
  

  return (
    <div className={classes.fullpost}>
      <section className={classes.post}>
        <h2 className={classes.title}>{props.post.title.toUpperCase()}</h2>
        <div className={classes.posted}>
          <p className={classes.author}>
            User ID: <span>#{props.post.userId}</span>
          </p>
          <p className={classes.date}>{`Posted on: ${props.dateStr}`}</p>
        </div>
        <p className={classes.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          magnam necessitatibus est ipsam cum illum aut dolor fugit quae?
          Placeat tenetur quisquam exercitationem sunt odio alias error expedita
          nesciunt itaque!
        </p>
      </section>
      <section className={classes.make_comment}>
        <MakePost
        isNew={false}
        name="description"
        onChange={(data: string) => {
          setData(data);
        }}
        sendPost={handleSendPost}
        value={data}
      />
      </section>
    </div>
  );
}
