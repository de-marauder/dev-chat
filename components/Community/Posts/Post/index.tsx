import Link from "next/link";
import React from "react";

import classes from "../../../../styles/Community/Post.module.scss";

export default function Post() {
  const date = new Date();
  const dateStr = date.toString().split(" ").slice(0, 4).join(" ");
  return (
    <Link href={`props.slug`}>
      <div className={classes.post}>
        <h2 className={classes.title}>Title</h2>
        <p className={classes.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          magnam necessitatibus est ipsam cum illum aut dolor fugit quae?
          Placeat tenetur quisquam exercitationem sunt odio alias error expedita
          nesciunt itaque!
        </p>
        <div className={classes.posted}>
          <p className={classes.author}>
            Author: <span>marauder</span>
          </p>
          <p className={classes.date}>{`Posted on: ${dateStr}`}</p>
        </div>
      </div>
    </Link>
  );
}
