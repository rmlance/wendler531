import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import { Chart } from "react-google-charts";

const IndexContainer = props => {

  useEffect(() => {
    fetch('api/v1/lifts', {
      credentials: "same-origin"
    })
    .then((response) => {
      if (response.ok) {
        return response
      }else {
        let errorMessage = `ERROR: ${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => response.json())
    .then((parsedLiftData) => {
      console.log(parsedLiftData)
    })
    .catch(error => console.log(`Error in fetch: ${error}`))
  }, [])

  return (
    <div>
      <Chart
        chartType="ScatterChart"
        data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  )
}

export default IndexContainer
