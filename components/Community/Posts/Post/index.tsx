import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import classes from "../../../../styles/Community/Post.module.scss";

type Props = {
    post: {
        body: string,
        id: number,
        title: string,
        userId: number
    }
}

export default function Post(props: Props) {

    const router = useRouter()
    // console.log(props)
  const date = new Date();
  const dateStr = date.toString().split(" ").slice(0, 4).join(" ");
  return (
    <Link href={`${router.route}/posts/${props.post.id}-${dateStr.split(' ').join('_')}`}>
      <div className={classes.post}>
        <h2 className={classes.title}>{props.post.title}</h2>
        <p className={classes.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          magnam necessitatibus est ipsam cum illum aut dolor fugit quae?
          Placeat tenetur quisquam exercitationem sunt odio alias error expedita
          nesciunt itaque!
        </p>
        <div className={classes.posted}>
          <p className={classes.author}>
            User ID: <span>#{props.post.userId}</span>
          </p>
          <p className={classes.date}>{`Posted on: ${dateStr}`}</p>
        </div>
      </div>
    </Link>
  );
}
