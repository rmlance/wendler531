import React, { useState } from 'react'

const Submitted = props => {
  return (
    <div>
      <h3 className="eoc-title">Submitted!</h3>
      <p className="eoc-text">Your next cycle of workouts has been created. Return home to continue your progression.</p>
      <p className="eoc-small-text-2">New Max:</p>
      <h1 className="end-of-cycle-max-right">{props.newMax}</h1>
    </div>
  )
}

export default Submitted
