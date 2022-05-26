import Link from "next/link";

import classes from "../../../styles/Navbar.module.scss";

type Props = {
  show: Boolean,
  showMenu: Function
}

function Navbar(props: Props) {

  const navbar = (
    <header className={classes.header}>
      <nav className={classes.nav}>
      <Link href="/">
        <div className={classes.logo}>
          Dev <span>CHAT</span>
        </div>
      </Link>
        <ul className={classes.nav_list}>
          <li className={classes.nav_item}><Link href='/'>Home</Link></li>
          <li className={classes.nav_item}><Link href='/contacts'>Contacts</Link></li>
          <li className={classes.nav_item}><Link href='/community'>Community</Link></li>
        </ul>

        <ul className={classes.auth}>
          <li className={`${classes.pri_btn} ${classes.btn}`}><Link href='/auth/login'>Login</Link></li>
          <li className={`${classes.sec_btn} ${classes.btn}`}><Link href='/auth/signup'>Signup</Link></li>
        </ul>
      </nav>
    </header>
  )

  return !props.show ? navbar : <div></div>;
}

export default Navbar;
