import React from "react";
import Backdrop from "./Backdrop";


type Props = {
    toggle: Function;
    children: JSX.Element
}
export default function Modal(props: Props) {
  return (
    <Backdrop toggle={props.toggle}>
      <div className="modal">{props.children}</div>
    </Backdrop>
  );
}
