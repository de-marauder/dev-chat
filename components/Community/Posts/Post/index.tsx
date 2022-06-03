import parse from 'html-react-parser';

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import classes from "../../../../styles/Community/Post.module.scss";

type Props = {
  post: {
    content: string;
    id: number;
    title: string;
    author: string;
    created_At: Date;
  };
};

export default function Post(props: Props) {
  const router = useRouter();

  return (
    <Link
      href={`${router.route}/post/${props.post.id}`}
    >
      <div className={classes.post}>
        <h2 className={classes.title}>{props.post.title}</h2>
        <div id="content" className={classes.desc}>
          {parse(props.post.content)}
        </div>
        <div className={classes.posted}>
          <p className={classes.author}>
            Author: <span>#{props.post.author}</span>
          </p>
          <p className={classes.date}>{`Posted on: ${props.post.created_At.toString().split('T')[0]}`}</p>
        </div>
      </div>
    </Link>
  );
}
