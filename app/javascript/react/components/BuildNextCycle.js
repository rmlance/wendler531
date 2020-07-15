import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "./ErrorList"
import NextCycleForm from './NextCycleForm'
import Submitted from './Submitted'

const BuildNextCycle = props => {
  const [redirect, setRedirect] = useState(false)
  const [newMax, setNewMax] = useState(0)

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
      setRedirect(true)
      setNewMax(editFormPayload.new_max)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let renderMe = <NextCycleForm liftName={props.liftName} buildCycle={buildCycle}/>

  if (redirect) {
    renderMe = <Submitted newMax={newMax}/>
  }

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="medium-6 small-6 eoc-left">
          <h3 className="eoc-title">Previous Cycle</h3>
          <p className="eoc-text">Here's the one-rep max you used for your recently completed cycle:</p>
          <p className="eoc-small-text">Previous Max:</p>
          <h1 className="end-of-cycle-max">{props.proj1rm}</h1>
        </div>
        <div className="medium-6 small-6">
        {renderMe}
        </div>
      </div>
    </div>
  )
}

export default BuildNextCycle
