import React, { useState } from 'react'

const EOCRecords = props => {
  return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="grid-container grid-x medium-6 small-12">
            <div className="medium-4 small-4">
            {props.workouts.updated_at}
            </div>
            <div className="medium-4 small-4">
            {props.workouts.format}
            </div>
          </div>
          <div className="grid-container medium-6 small-12">
          Hi
          </div>
        </div>
      </div>
  )
}

export default EOCRecords
