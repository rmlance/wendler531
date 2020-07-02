import React from 'react'
import { Link, Redirect } from "react-router-dom"

const LiftBlock = props => {
  return (
    <div>
      <div className="text-center max-box">
        <p className="projected_1rm">Projected One-Rep Max:</p>
        <h1 className="tile-text">{props.projected_1rm}</h1>
      </div>
      <div className="text-center">
        <p className="lift-name">{props.name}</p>
        <Link to={`/lifts/${props.linkId}`} className="button start-workout-button">Start {props.name} Workout</Link>
      </div>
    </div>
  )
}

export default LiftBlock
