import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import classes from "../../styles/Auth/login.module.scss";

function Signup() {
  const router = useRouter();
  const currRoute = router.asPath;
  console.log(router.asPath);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const username = target[0] as HTMLInputElement;
    const password1 = target[1] as HTMLInputElement;
    const password2 = target[2] as HTMLInputElement;
    console.log(username);

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password1: password1.value,
        password2: password2.value,
      }),
    }).then(async (response)=> {

      if (response.ok) {
        console.log(response)
        var res = response.json()
        return res
      };

    }).then((data)=>{
      console.log(data)
    });
  };

  const footer =
    currRoute === "auth/login" ? (
      <p>
        Don&apos;t have an account?
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
        <form onSubmit={(e)=>formSubmitHandler(e)}>
          <div className={classes.input_wrapper}>
            <input
              className={classes.input}
              type="text"
              name="username"
              placeholder="username"
              id="username"
              required
            />
            <input
              className={classes.input}
              type="password"
              name="password1"
              placeholder="password"
              id="password1"
              required
            />
            <input
              className={classes.input}
              type="password"
              name="password2"
              placeholder="confirm password"
              id="password2"
              required
            />
          </div>
          <div className={classes.submit_btn_wrapper}>
            <input
              onClick={(e) => e.preventDefault}
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
