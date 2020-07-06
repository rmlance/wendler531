import React, { useEffect, useState } from 'react'
import ErrorList from "./ErrorList"
import PreviousWorkout from './PreviousWorkout'

const WorkoutForm = props => {
  const [errors, setErrors] = useState({})
  const [dataVisibility, setDataVisibility] = useState(false)

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["set1", "set2", "set3", "reps3"]
    requiredFields.forEach(field => {
      props.editFormPayload[field] = parseInt(props.editFormPayload[field])
      if (isNaN(props.editFormPayload[field])) {
        submitErrors = {
          ...submitErrors,
          [field]: "must be an integer."
        }
      props.editFormPayload[field] = props.editFormPayload[field].toString()
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.completedWorkoutUpdate(props.editFormPayload)
      setErrors({})
    }
  }

  const toggleVisbility = () => {
    if (!dataVisibility) {
      return setDataVisibility(true)
    } else {
      return setDataVisibility(false)
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />

          <div className="grid-x set-container">
            <div className="set-box medium-4 small-4">Set 1</div>
            <div className="reps-box medium-4 small-4">
              <p className="reps-title">Reps</p>
              {props.editFormPayload.reps1}
            </div>
            <label className="weight-box medium-4 small-4">
              Weight
              <input
                name="set1"
                id="set1"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set1}
              />
            </label>
          </div>

          <div className="toggle-workout-data"onClick={toggleVisbility}>
            Show Previous Workout Data:
          </div>

          <PreviousWorkout
            previousWorkout={props.previousWorkout[0]}
            visibile={dataVisibility}
          />


          <div className="grid-x set-container">
            <div className="set-box medium-4 small-4">Set 2</div>
            <div className="reps-box medium-4 small-4">
              <p className="reps-title">Reps</p>
              {props.editFormPayload.reps2}
            </div>
            <label className="weight-box medium-4 small-4">
              Weight
                <input
                name="set2"
                id="set2"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set2}
              />
            </label>
          </div>

          <div className="toggle-workout-data" onClick={toggleVisbility}>
            Show Previous Workout Data:
          </div>

          <PreviousWorkout
            previousWorkout={props.previousWorkout[1]}
            visibile={dataVisibility}
          />

          <div className="grid-x set-container">
            <div className="set-box medium-4 small-4">Set 3</div>
            <label className="weight-box medium-4 small-4">
              Reps
              <input
                name="reps3"
                id="reps3"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.reps3}
              />
            </label>

            <label className="weight-box medium-4 small-4">
              Weight
              <input
                name="set3"
                id="set3"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set3}
              />
            </label>
          </div>

          <div className="toggle-workout-data" onClick={toggleVisbility}>
            Show Previous Workout Data:
          </div>

          <PreviousWorkout
            previousWorkout={props.previousWorkout[2]}
            visibile={dataVisibility}
          />

          <input className="button build-progression-button" type="submit" value="Workout Complete!" />
        </form>
    </div>
  )
}

export default WorkoutForm
