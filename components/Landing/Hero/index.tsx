import { useRouter } from "next/router";
import classes from "../../../styles/Landing/Hero.module.scss";


function Hero() {

  const router = useRouter();

  return (
    <section className={classes.Hero}>
      <div className={classes.Image}>
      </div>
      <div className={classes.Title}>
        <h1>Meet fellow Devs</h1>
        <p>&amp;</p>
        <h2>Have a blast</h2>
        <br />
        <button onClick={()=>{
          router.push('/auth/login')
        }}
        className={`${classes.btn} ${classes.pri_btn} ${classes.hero_btn}`}>Get Started</button>
      </div>
    </section>
  );
}

export default Hero;