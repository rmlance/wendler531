import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import StartForm from './StartForm'

const StartContainer = props => {
  const [newProgressionData, setNewProgressionData] = useState({})
  const [redirect, setRedirect] = useState(false)

  const addNewProgression = (formPayload) => {
    fetch('/api/v1/lifts.json', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(formPayload),
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
    .then(response => {
      response.json()
    })
    .then(parsedProgression => {
      setNewProgressionData(parsedProgression)
      setRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (redirect) {
    return <Redirect to={`/`} />
  }

  return (
    <div className="grid-container grid-x">
    <div className="cell medium-3 small-0"></div>
      <div className="cell medium-6 small-12 progression-container">
        <h3 className="text-center color-1">Let's start by collecting some data.</h3>
        <p className="text-center">For each of the lifts specified below, enter your estimated one-rep max.</p>
        <StartForm
          addNewProgression={addNewProgression}
        />
      </div>
    </div>
  )
}

export default StartContainer
