import React from "react";

import classes from '../../styles/Community/index.module.scss'


type Props = {
  children: JSX.Element
}


const CommunityLayout = (props: Props) => {
  return (
    <section className={classes.community}>
      {props.children}
    </section>
  );
}

export default CommunityLayout;
