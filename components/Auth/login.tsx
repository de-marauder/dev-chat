import Link from "next/link";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

import classes from "../../styles/Auth/login.module.scss";

type body = {
  username: string;
  password: string;
};

function Login() {
  const router = useRouter();
  const currRoute = router.asPath;

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const username = target[0] as HTMLInputElement;
    const password = target[1] as HTMLInputElement;
    console.log(username);

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log(response);
          var res = response.json();
          return res;
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <section className={`${classes.Hero}`}>
      <div className={classes.form_wrapper}>
        <h1>Login</h1>
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className={classes.input_wrapper}>
            <input
              className={classes.input}
              required
              type="text"
              name="username"
              placeholder="username"
              id="username"
            />
            <input
              className={classes.input}
              required
              type="password"
              name="password"
              placeholder="password"
              id="password"
            />
          </div>
          <div className={classes.submit_btn_wrapper}>
            <input
              onClick={(e) => formSubmitHandler(e)}
              className={`${classes.btn} ${classes.sec_btn}`}
              type="submit"
              value="LOGIN"
            />
          </div>

          <div className={classes.form_footer}>
            <p>
              Don't have an account?{" "}
              <span>
                {currRoute === "login" ? (
                  <Link href="/auth/signup">sign up</Link>
                ) : (
                  <Link href="/auth/signup">sign up</Link>
                )}
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
