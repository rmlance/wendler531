import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import LiftBlock from './LiftBlock'

const IndexContainer = props => {
  const [liftData, setLiftData] = useState([])

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
      setLiftData(parsedLiftData)
    })
    .catch(error => console.log(`Error in fetch: ${error}`))
  }, [])

  // Set headers, determine length of maximum data points
  let headers = ["Date"]
  let i = 0
  liftData.forEach(item => {
    headers.push(item.name)
    if (item.workouts.length > i) {
      i = item.workouts.length
    }
  })

  let n = 0
  let data = [headers]
  while (n < i) {
    liftData.forEach(item => {
      if (item.workouts[n]) {
        let dataPoint = [item.workouts[n].created_at.slice(0, 10), null, null, null, null]
        switch (item.name) {
          case "Bench Press":
            dataPoint[1] = item.workouts[n].projected_1rm
            break;
          case "Back Squat":
            dataPoint[2] = item.workouts[n].projected_1rm
          break;
        case "Overhead Press":
            dataPoint[3] = item.workouts[n].projected_1rm
          break;
        case "Deadlift":
          dataPoint[4] = item.workouts[n].projected_1rm
          break;
        }
        data.push(dataPoint)
      }
    })
    n++
  }
  console.log(data);

  const liftBlocks = liftData.map(lift => {
    return (
      <div className="callout medium-3" key={lift.id}>
        <LiftBlock
          name={lift.name}
          projected_1rm={lift.workouts[lift.workouts.length -1].projected_1rm}
        />
      </div>
    )
  })

  const options = {
    title: "Projected One-Rep Max Progrssion",
    legend: { position: "bottom" },
    chartArea: {left:40, top: 50, right: 20},
    interpolateNulls: true,
    vAxis: {
      title: 'Weight (lbs)',
      gridlines: {color: "#C6C6C6", count: 10}
    },
    hAxis: {
      title: "Date"
    }
  };

  return (
    <div className="grid-container grid-x">
      <div className="cell medium-5">
        <Chart
          chartType="LineChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
      <div className="cell medium-7">
        <div className="grid-container grid-x">
          {liftBlocks}
        </div>
      </div>
    </div>
  )
}

export default IndexContainer
