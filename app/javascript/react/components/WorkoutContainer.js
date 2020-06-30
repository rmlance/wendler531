import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import WorkoutForm from './WorkoutForm'

const WorkoutContainer = props => {
  const [liftObject, setLiftObject] = useState({})
  const [editFormPayload, setEditFormPayload] = useState({
    set1: "",
    set2: "",
    set3: "",
    reps1: "",
    reps2: "",
    reps3: ""
  })
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
      var todaysWorkout = parsedWorkoutData.workouts.filter(workout => workout.completed == false)[0]
      setEditFormPayload({
        set1: todaysWorkout.setts[0].weight,
        set2: todaysWorkout.setts[1].weight,
        set3: todaysWorkout.setts[2].weight,
        reps1: todaysWorkout.setts[0].reps,
        reps2: todaysWorkout.setts[1].reps,
        reps3: todaysWorkout.setts[2].reps
      })
    })
    .catch(error => console.error(`Error in fetch: $[errorMessage]`))
  }, [])

  const completedWorkoutUpdate = (editFormPayload) =>{
    let functionalData = {
      set1: editFormPayload["set1"],
      set2: editFormPayload["set2"],
      set3: editFormPayload["set3"],
      reps: editFormPayload["reps3"]
    }
    fetch(`/api/v1/lifts/${fetchId}`, {
      credentials: "same-origin",
      method: 'PATCH',
      body: JSON.stringify(functionalData),
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

  const handleInputChange = event => {
    setEditFormPayload({
      ...editFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  if (redirect) {
    return <Redirect to={`/`} />
  }

  return (
    <div className="grid-container">
      <h3>{liftObject.name}</h3>
      <WorkoutForm
        editFormPayload={editFormPayload}
        setEditFormPayload={setEditFormPayload}
        completedWorkoutUpdate={completedWorkoutUpdate}
        handleInputChange={handleInputChange}
      />
    </div>
  )
}

export default WorkoutContainer
