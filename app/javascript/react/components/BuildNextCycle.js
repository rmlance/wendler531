import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "./ErrorList"

const BuildNextCycle = props => {
  const [editFormPayload, setEditFormPayload] = useState({
    new_max: "",
    lift_name: props.liftName
  })
  const [errors, setErrors] = useState({})

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
      buildCycle(editFormPayload)
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

  const buildCycle = (editFormPayload) => {
    fetch('/api/v1/lifts.json', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(editFormPayload),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusTxt})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedProgression => {
      // setRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="grid-container">
      <p>In order to continue recording workouts, complete the following form:</p>
      <h3 className="">Build Your Next Cycle</h3>
      <div className="grid-x">
        <div className="medium-6 small-6">
          <h1>{props.proj1rm}</h1>
        </div>
        <div className="medium-6 small-6">
        <form onSubmit={handleSubmit}>
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
        </div>
      </div>
    </div>
  )
}

export default BuildNextCycle
