import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import classes from "../../styles/Community/FullPost.module.scss";
import MakePost from "./Posts/Post/makePost";

type Props = {
  post: {
    content: string;
    id: number;
    title: string;
    author: string;
    comments: [] | [{ author: string; content: string; created_At: Date}];
    created_At: Date;
  };
};

export default function FullPost(props: Props) {
  const [data, setData] = useState("");

  const router = useRouter()

  const { data: session } = useSession();

  const handleComment = async () => {
    // hit create post api with post request
    console.log(data);

    await fetch(`http://localhost:3000/api/post/${props.post.id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: data,
        author: session?.user?.name,
      }),
    });

    router.push(`/community/post/${props.post.id}`)
  };

  const postComments = props.post.comments.length > 0 ? props.post.comments.map((comment: {author: string; content: string; created_At: Date}, id) => {
    return (<div key={id} className={classes.comment}>
      <div className={classes.comment__top}>
        {/* <img src={comment.userImg} alt='user image' /> */}
        <p>{comment.author}</p>
        <p>Posted on: <span>{comment.created_At.toString().split('T')[0]}</span></p>
      </div>
      <div>
        {parse(comment.content)}
      </div>
    </div>);
  }) : null;

  return (
    <section className={classes.fullpost}>
      <article className={classes.post}>
        <h2 className={classes.title}>{props.post.title.toUpperCase()}</h2>
        <div className={classes.posted}>
          <p className={classes.author}>
            Author: <span>{props.post.author}</span>
          </p>
          <p
            className={classes.date}
          >{`Posted on: ${props.post.created_At.toString()}`}</p>
        </div>
        <div className={classes.desc}>{parse(props.post.content)}</div>
      </article>
      {session && (
        <section className={classes.make_comment}>
          <MakePost
            isNew={false}
            name="description"
            onChange={(data: string) => {
              setData(data);
            }}
            title={""}
            setTitle={null}
            sendPost={handleComment}
            value={data}
          />
        </section>
      )}

      <section className={classes.comments}>{postComments}</section>
    </section>
  );
}
