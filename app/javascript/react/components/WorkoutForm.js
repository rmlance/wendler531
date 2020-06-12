import React, { useEffect, useState } from 'react'
import ErrorList from "./ErrorList"

const WorkoutForm = props => {
  const [errors, setErrors] = useState({})

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

  return (
    <div>
    <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />

          <div className="grid-x callout">
            <div className="set-box medium-4 small-4">Set 1</div>
            <div className="reps-box medium-3 small-3">{props.editFormPayload.reps1}</div>
            <label className="weight-box medium-3 small-3">
              Weight
              <input
                name="set1"
                id="set1"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set1}
              />
            </label>
            <div className="set-box medium-2 small-2">Completed</div>
          </div>

          <div className="grid-x callout">
            <div className="set-box medium-4 small-4">Set 2</div>
            <div className="reps-box medium-3 small-3">{props.editFormPayload.reps2}</div>
            <label className="weight-box medium-3 small-3">
              Weight
                <input
                name="set2"
                id="set2"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set2}
              />
            </label>
            <div className="set-box medium-2 small-2">Completed</div>
          </div>

          <div className="grid-x callout">
            <div className="set-box medium-4 small-4">Set 3</div>
            <label className="weight-box medium-3 small-3">
              Reps
              <input
                name="reps3"
                id="reps3"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.reps3}
              />
            </label>

            <label className="weight-box medium-3 small-3">
              Weight
              <input
                name="set3"
                id="set3"
                type="text"
                onChange={props.handleInputChange}
                value={props.editFormPayload.set3}
              />
            </label>
            <div className="set-box medium-2 small-2">Completed</div>
          </div>

        <div className="button-group">
          <input className="button" type="submit" value="Workout Complete!" />
        </div>
        </form>
    </div>
  )
}

export default WorkoutForm
