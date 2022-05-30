import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import classes from "../../../styles/Sidebar.module.scss";

type Props = {
  show: Boolean;
  showSidebar: Function;
};

function Sidebar(props: Props) {
  const router = useRouter();

  // console.log(router);

  // useEffect(() => {
  //   const currActiveLink = document.querySelector(`.${classes.active}`)!;
  //   console.dir(currActiveLink);
  //   console.dir(`${classes.active}`);
  //   currActiveLink.classList.remove(`${classes.active}`);
  //   console.dir(currActiveLink);

  //   let newActiveLink: HTMLElement;
  //   switch (router.route) {
  //     case "/":
  //       console.log("/");
  //       newActiveLink = document.getElementById(`home`)!;
  //       newActiveLink.classList.add(`${classes.active}`);
  //       break;
  //     case "/contacts":
  //       console.log("contacts");
  //       newActiveLink = document.getElementById(`contacts`)!;
  //       currActiveLink.classList.add(`${classes.active}`);
  //       break;
  //     case "/community":
  //       console.log("community");
  //       newActiveLink = document.getElementById(`community`)!;
  //       currActiveLink.classList.add(`${classes.active}`);
  //       console.log("newActiveLink", newActiveLink);
  //       break;
  //   }
  // });
  return (
    <aside className={classes.sidebar}>
      <nav
        onClick={() => props.showSidebar(!props.show)}
        className={classes.nav}
      >
        <Link href="/">
          <div className={classes.logo}>
            Dev <span>CHAT</span>
          </div>
        </Link>
        <ul className={classes.nav_list}>
          <li id="home" className={`${classes.nav_item} ${router.route === '/' ? classes.active : ''}`}>
            <Link href="/">Home</Link>
          </li>
          <hr />
          <li id="contacts" className={`${classes.nav_item} ${router.route === '/contacts' ? classes.active : ''}`}>
            <Link href="/contacts">Contacts</Link>
          </li>
          <hr />
          <li id="community" className={`${classes.nav_item} ${router.route === '/community' ? classes.active : ''}`}>
            <Link href="/community">Community</Link>
          </li>
        </ul>

        <ul className={classes.auth}>
          <li className={`${classes.pri_btn} ${classes.btn}`}>
            <Link href="/auth/login">Login</Link>
          </li>
          <li className={`${classes.sec_btn} ${classes.btn}`}>
            <Link href="/auth/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
