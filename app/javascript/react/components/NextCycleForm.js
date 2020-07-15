import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "./ErrorList"


const NextCycleForm = props => {
  const [editFormPayload, setEditFormPayload] = useState({
    new_max: "",
    lift_name: props.liftName
  })
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)

  const validForSubmission = () => {
    let submitErrors = {}
      if (isNaN(editFormPayload["new_max"]) || editFormPayload["new_max"] == "") {
        submitErrors = {
          ...submitErrors,
          ["new_max"]: "must be a number"
        }
      }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.buildCycle(editFormPayload)
      setErrors({})
    }
  }

  const handleInputChange = event => {
    setEditFormPayload({
      ...editFormPayload,
      [event.currentTarget.name]: event.currentTarget.value,
      lift_name: props.liftName
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="eoc-title">Next Cycle</h3>
      <p className="eoc-text">In order to continue recording workouts, complete the following form:</p>
      <ErrorList errors={errors} />

      <label className="weight-box medium-4 small-4">
      Enter a new one-rep max.
      <input
        name="new_max"
        id="new_max"
        type="text"
        onChange={handleInputChange}
        value={editFormPayload.value}
      />
      </label>

      <input className="button build-progression-button" type="submit" value="Submit" />
    </form>
  )
}

export default NextCycleForm
