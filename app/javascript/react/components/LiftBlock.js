import React from 'react'
import { Link, Redirect } from "react-router-dom"

const LiftBlock = props => {
  return (
    <div>
    <p className="projected_1rm">One-Rep Max:</p>
      <div className="text-center">
        <h1 className="tile-text">{props.projected_1rm}</h1>
        <p className="lift-name">{props.name}</p>
        <Link to={`/lifts/${props.linkId}`} className="button start-workout-button">Start {props.name} Workout</Link>
      </div>
    </div>
  )
}

export default LiftBlock
