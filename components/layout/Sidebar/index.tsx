import Link from 'next/link';
import classes from '../../../styles/Sidebar.module.scss'

type Props = {
  show: Boolean;
  showSidebar: Function;
};

function Sidebar(props: Props) {
  return (
    <aside className={classes.sidebar}>
      <nav onClick={()=>props.showSidebar(!props.show)} className={classes.nav}>
        <Link href="/">
          <div className={classes.logo}>
            Dev <span>CHAT</span>
          </div>
        </Link>
        <ul className={classes.nav_list}>
          <li className={classes.nav_item}><Link href='/'>Home</Link></li><hr />
          <li className={classes.nav_item}><Link href='#'>Contacts</Link></li><hr />
          <li className={classes.nav_item}><Link href='#'>Community</Link></li>
        </ul>

        <ul className={classes.auth}>
          <li className={`${classes.pri_btn} ${classes.btn}`}><Link href='/auth/login'>Login</Link></li>
          <li className={`${classes.sec_btn} ${classes.btn}`}><Link href='/auth/signup'>Sign up</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
