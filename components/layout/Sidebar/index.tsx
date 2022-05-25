import Link from 'next/link';
import classes from '../../../styles/Sidebar.module.scss'

type Props = {
  show: Boolean;
  showSidebar: Function;
};

function Sidebar(props: Props) {
  return (
    <aside className={classes.sidebar}>
      <nav className={classes.nav}>
        <Link href="/">
          <div className={classes.logo}>
            Dev <span>CHAT</span>
          </div>
        </Link>
        <ul className={classes.nav_list}>
          <li className={classes.nav_item}>Home</li><hr />
          <li className={classes.nav_item}>Contacts</li><hr />
          <li className={classes.nav_item}>Community</li>
        </ul>

        <ul className={classes.auth}>
          <li className={`${classes.pri_btn} ${classes.btn}`}>Login</li>
          <li className={`${classes.sec_btn} ${classes.btn}`}>Sign up</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
