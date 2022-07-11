import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'

import classes from "../../../styles/Navbar.module.scss";

type Props = {
  show: Boolean;
  showMenu: Function;
};

function Navbar(props: Props) {
  const router = useRouter();

  const { data: session } = useSession();

  // console.log("session", session);

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // const style = { "--name": `${session?.user?.name }`} as React.CSSProperties;
  const name = session?.user?.name;
  const navbar = (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href="/">
          <div className={classes.logo}>
            Dev <span>CHAT</span>
          </div>
        </Link>
        <ul className={classes.nav_list}>
          <li
            className={`${classes.nav_item} ${
              router.route === "/" ? classes.active : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${classes.nav_item} ${
              router.route === "/contacts" ? classes.active : ""
            }`}
          >
            <Link href="/contacts">Contacts</Link>
          </li>
          <li
            className={`${classes.nav_item} ${
              router.route === "/community" ? classes.active : ""
            }`}
          >
            <Link href="/community">Community</Link>
          </li>
        </ul>
        
        <ul className={classes.auth}>
          {session ? (
            <>
                <li data-name={name}  className={`${classes.user_profile} ${router.route === '/profile' ? classes.active : ''}`}><Link href='/profile'>
                  <img width='20px' height='20px' src={session?.user?.image ? session?.user?.image : ""} alt='profile pic' />
                  </Link></li>
              <li
                className={`${classes.pri_btn} ${classes.btn}`}
                onClick={() => signOut()}
              >
                Sign Out
              </li>
            </>
          ) : (
            <li
              className={`${classes.sec_btn} ${classes.btn}`}
              onClick={() => signIn("google")}
            >
              Sign In
            </li>
          )}
        </ul>
      </nav>
    </header>
  );

  return !props.show ? navbar : <div></div>;
}

export default Navbar;
