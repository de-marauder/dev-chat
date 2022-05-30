import React from 'react'

type Props = {
    toggle: Boolean;
    children: JSX.Element
}

export default function (props: Props) {
  return (
    <div onClick={()=>{props.toggle()}} className='backdrop'>{props.children}</div>
  )
}
