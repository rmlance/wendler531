import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from "./ErrorList"

const WorkoutContainer = props => {
  const [liftObject, setLiftObject] = useState({
    workouts: []
  })
  const [editFormPayload, setEditFormPayload] = useState({
    set1: "",
    set2: "",
    set3: ""
  })
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const fetchId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/lifts/${fetchId}`, {
      credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {
        return response
      }else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedWorkoutData => {
      setLiftObject(parsedWorkoutData)
      const todaysWorkout = parsedWorkoutData.workouts.filter(workout => workout.completed == false)[0]
      setEditFormPayload({
        set1: todaysWorkout.setts[0].weight,
        set2: todaysWorkout.setts[1].weight,
        set3: todaysWorkout.setts[2].weight
      })
    })
    .catch(error => console.error(`Error in fetch: $[errorMessage]`))
  }, [])

  const handleInputChange = event => {
    setEditFormPayload({
      ...editFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const completedWorkoutUpdate = (editFormPayload) =>{
    fetch(`/api/v1/lifts/${fetchId}`, {
      credentials: "same-origin",
      method: 'PATCH',
      body: JSON.stringify(editFormPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedEditResponse => {
      setRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["set1", "set2", "set3"]
    requiredFields.forEach(field => {
      editFormPayload[field] = parseInt(editFormPayload[field])
      if (isNaN(editFormPayload[field])) {
        submitErrors = {
          ...submitErrors,
          [field]: "must be an integer."
        }
      editFormPayload[field] = editFormPayload[field].toString()
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      completedWorkoutUpdate(editFormPayload)
      setEditFormPayload({
        set1: "",
        set2: "",
        set3: ""
      })
      setErrors({})
    }
  }

  if (redirect) {
    return <Redirect to={`/`} />
  }

  return (
    <div className="grid-container">
    <h1>{liftObject.name}</h1>
    <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />

          <label className="set1">
            Set 1
            <input
              name="set1"
              id="set1"
              type="text"
              onChange={handleInputChange}
              value={editFormPayload.set1}
            />
          </label>

          <label className="set2">
            Set 2
            <input
              name="set2"
              id="set2"
              type="text"
              onChange={handleInputChange}
              value={editFormPayload.set2}
            />
          </label>

          <label className="set3">
            Set 3
            <input
              name="set3"
              id="set3"
              type="text"
              onChange={handleInputChange}
              value={editFormPayload.set3}
            />
          </label>

        <div className="button-group">
          <input className="button" type="submit" value="Workout Complete!" />
        </div>
        </form>
    </div>
  )
}

export default WorkoutContainer
