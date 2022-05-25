import classes from "../../../styles/Menu.module.scss";

type Props = {
    show: Boolean,
    showMenu: Function
}

function Menu(props: Props) {
  return (
    <div
      className={`${classes.menu} ${props.show ? classes.open : null}`}
      onClick={() => props.showMenu(!props.show)}
    >
      <div></div>
    </div>
  );
}

export default Menu;
