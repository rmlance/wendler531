import React from 'react'

const LiftBlock = props => {
  return (
    <div className="">
      <p>{props.projected_1rm}</p>
      {props.name}
    </div>
  )
}

export default LiftBlock
