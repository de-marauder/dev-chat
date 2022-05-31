import React from 'react'

type Props = {
    toggle: Function;
    // children: JSX.Element
}

export default function (props: Props) {
  return (
    <div onClick={()=>{props.toggle()}} className='backdrop'></div>
  )
}
