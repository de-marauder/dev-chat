import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/Auth/login.module.scss";

function Login() {

    const router = useRouter()
    const currRoute = router.asPath
    console.log(router.asPath)
  return (
    <section className={`${classes.Hero}`}>
      <div className={classes.form_wrapper}>
        <h1>Login</h1>
        <form>
          <div className={classes.input_wrapper}>
            <input className={classes.input} required type="text" name="username" placeholder="username" id="username" />
            <input className={classes.input} required type="password" name="password" placeholder="password" id="password" />
          </div>
          <div className={classes.submit_btn_wrapper}>
            <input onClick={(e)=>e.preventDefault}
              className={`${classes.btn} ${classes.sec_btn}`}
              type="submit"
              value="LOGIN"
            />
          </div>

          <div className={classes.form_footer}>
              <p>Don't have an account? <span>
                  {currRoute === 'login' ? <Link href='/auth/signup'>sign up</Link> :
                  <Link href='/auth/signup'>sign up</Link>}
                  </span></p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
