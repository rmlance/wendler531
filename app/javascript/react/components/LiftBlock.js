import React from 'react'

const LiftBlock = props => {
  return (
    <div className="text-center">
      <h1>{props.projected_1rm}</h1>
      <p>{props.name}</p>
    </div>
  )
}

export default LiftBlock
