import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/Auth/login.module.scss";

function Signup() {
  const router = useRouter();
  const currRoute = router.asPath;
  console.log(router.asPath);

  const footer =
    currRoute === "auth/login" ? (
      <p>
        Don't have an account?
        <span>
          <Link href="/auth/signup">sign up</Link>
        </span>
      </p>
    ) : (
        <p>
        Already have an account?
        <span>
          <Link href="/auth/login">log in</Link>
        </span>
      </p>
    );

  return (
    <section className={`${classes.Hero}`}>
      <div className={classes.form_wrapper}>
        <h1>Sign up</h1>
        <form>
          <div className={classes.input_wrapper}>
            <input
              className={classes.input}
              type="text"
              name="username"
              placeholder="username"
              id="username"
            />
            <input
              className={classes.input}
              type="password"
              name="password1"
              placeholder="password"
              id="password1"
            />
            <input
              className={classes.input}
              type="password"
              name="password2"
              placeholder="confirm password"
              id="password2"
            />
          </div>
          <div className={classes.submit_btn_wrapper}>
            <input
              className={`${classes.btn} ${classes.sec_btn}`}
              type="submit"
              value="SIGNUP"
            />
          </div>

          <div className={classes.form_footer}>{footer}</div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
