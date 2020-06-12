import React, { useEffect, useState } from 'react'
import ErrorList from "./ErrorList"

const WorkoutForm = props => {
  const [errors, setErrors] = useState({})

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["set1", "set2", "set3", "reps"]
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
    <div className="grid-container">
    <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />

          <label className="set1">
          Set 1
            <input
            className="cell medium-1"
              name="set1"
              id="set1"
              type="text"
              onChange={props.handleInputChange}
              value={props.editFormPayload.set1}
            />
          </label>

          <label className="set2">
            Set 2
            <input
              name="set2"
              id="set2"
              type="text"
              onChange={props.handleInputChange}
              value={props.editFormPayload.set2}
            />
          </label>

          <label className="set3">
            Set 3
            <input
              name="set3"
              id="set3"
              type="text"
              onChange={props.handleInputChange}
              value={props.editFormPayload.set3}
            />
          </label>

          <label className="reps">
            Reps
            <input
              name="reps"
              id="reps"
              type="text"
              onChange={props.handleInputChange}
              value={props.editFormPayload.reps}
            />
          </label>

        <div className="button-group">
          <input className="button" type="submit" value="Workout Complete!" />
        </div>
        </form>
    </div>
  )
}

export default WorkoutForm
