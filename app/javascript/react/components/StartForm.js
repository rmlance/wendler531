import React, { useState } from 'react'
import _ from "lodash"
import ErrorList from "./ErrorList"

const StartForm = props => {
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    squat: "",
    bench: "",
    deadlift: "",
    press: ""
  })

  const handleInputChange = event => {
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["squat", "bench", "deadlift", "press"]
    requiredFields.forEach(field => {
      if (newFormPayload[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.addNewProgression(newFormPayload)
      setNewFormPayload({
        squat: "",
        bench: "",
        deadlift: "",
        press: ""
      })
      setErrors({})
    }
  }
  return (
    <div className="grid-container">
    <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />

          <label className="squat">
            Back Squat:
            <input
              name="squat"
              id="squat"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.squat}
            />
          </label>

          <label className="bench">
            Bench Press:
            <input
              name="bench"
              id="bench"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.bench}
            />
          </label>

          <label className="deadlift">
            Deadlift
            <input
              name="deadlift"
              id="deadlift"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.deadlift}
            />
          </label>

          <label className="press">
            Overhead Press
            <input
              name="press"
              id="press"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.press}
            />
          </label>

        <div className="button-group">
          <input className="button" type="submit" value="Build My Workouts" />
        </div>
        </form>
    </div>
  )
}

export default StartForm
