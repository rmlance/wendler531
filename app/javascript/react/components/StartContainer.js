import React from 'react'

const StartContainer = props => {
  return (
    <div className="grid-container">
    <h3>Questions:</h3>
    <li>Baseline data</li>
    <li>Generate initial data from baseline form submission</li>
    <li>Check box for "first time users"</li>
    <li>Form submission adds on extra baseline datapoint as format: baseline, complete: true, to render first point on "home"</li>
    </div>
  )
}

export default StartContainer
