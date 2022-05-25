import classes from '../../../styles/Main.module.scss';

type Props = {
    children: JSX.Element
}

function Main(props: Props) {
    return (
        <main className={classes.main}>
            {props.children}
        </main>
    )
}

export default Main;