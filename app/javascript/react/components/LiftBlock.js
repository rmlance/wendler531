import React from 'react'
import { Link, Redirect } from "react-router-dom"

const LiftBlock = props => {
  return (
    <div className="text-center">
      <h1>{props.projected_1rm}</h1>
      <p>{props.name}</p>
      <Link to={`/lifts/${props.linkId}`} className="button track-button">Start Next {props.name} Workout</Link>
    </div>
  )
}

export default LiftBlock
