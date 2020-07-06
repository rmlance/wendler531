import React from 'react'

const PreviousWorkout = props => {
  let weight = props.previousWorkout.weight
  let reps = props.previousWorkout.reps
  let proj_1rm = props.previousWorkout.projected_1rm
  let date = props.previousWorkout.updated_at.slice(0, 10)

  if (props.visibile == 0) {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div className="grid-x">
      <div className="set-box medium-4 small-4">
      <p>Date: {date}</p>
      </div>
      <div className="reps-box medium-3 small-3">
      <p>{reps}</p>
      </div>
      <div className="weight-box medium-3 small-3">
      <p>{weight}</p>
      </div>
      <div className="weight-box medium-2 small-2">Projected 1RM
      <p>{proj_1rm}</p>
      </div>
      </div>
    )
  }

}

export default PreviousWorkout
