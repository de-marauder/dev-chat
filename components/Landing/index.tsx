import Hero from "./Hero";

import classes from "../../styles/Landing/index.module.scss"

function Landing() {
  return (
    <div className={classes.Landing}>
      <Hero />
    </div>
  );
}

export default Landing;
