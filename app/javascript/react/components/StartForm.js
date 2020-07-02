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
    <div>
      <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />

        <div className="form__group field">
          <input
            className="form__field"
            name="squat"
            id="squat"
            type="input"
            onChange={handleInputChange}
            placeholder="squat"
            value={newFormPayload.squat}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <label htmlFor="squat" className="form__label">Back Squat:</label>
        </div>


        <div className="form__group field">
          <input
            className="form__field"
            name="bench"
            id="bench"
            type="input"
            onChange={handleInputChange}
            placeholder="bench"
            value={newFormPayload.bench}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <label htmlFor="bench" className="form__label">Bench Press:</label>
        </div>

        <div className="form__group field">
          <input
            className="form__field"
            name="deadlift"
            id="deadlift"
            type="input"
            onChange={handleInputChange}
            placeholder="deadlift"
            value={newFormPayload.deadlift}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <label htmlFor="deadlift" className="form__label">Deadlift:</label>
        </div>

        <div className="form__group field">
          <input
            className="form__field"
            name="press"
            id="press"
            type="input"
            onChange={handleInputChange}
            placeholder="press"
            value={newFormPayload.press}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <label htmlFor="press" className="form__label">Overhead Press:</label>
        </div>

        <input className="button build-progression-button" type="submit" value="Build My Progression" />
      </form>
    </div>
  )
}

export default StartForm
