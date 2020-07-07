import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

const EndOfCycleContainer = props => {
  const fetchId = props.match.params.id
  const [workoutData, setWorkoutData] = useState({
    initial_1rm: 0,
    name: "lift",
    workouts: [{
      format: "format",
      projected_1rm: 0,
      updated_at: "date",
      setts: [{
        reps: 0,
        weight: 0,
        projected_1rm: 0,
        updated_at: "date"
      }]
    }]
  })

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
      setWorkoutData(parsedWorkoutData)
    })
    .catch(error => console.error(`Error in fetch: $[errorMessage]`))
  }, [])

  let headers = ["Date", `${workoutData.name}`]
  let data = [headers]
  workoutData.workouts.forEach((workout) => {
    workout.setts.forEach((set) => {
      let dataPoint = [set.updated_at.slice(0, 10), set.projected_1rm]
      data.push(dataPoint)
    })
  })

  const options = {
    title: `${workoutData.name} Projected One-Rep Max Progression By Set`,
    legend: { position: "bottom" },
    chartArea: {
      left:40,
      top: 50,
      right: 20
    },
    interpolateNulls: true,
    vAxis: {
      title: 'Weight (lbs)',
      gridlines: {color: "#C6C6C6", count: 10}
    },
    hAxis: {
      title: "Date"
    }
  };

  alet loader = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div></div>

  return (
    <div className="grid-container">
      <h3 className="active-workout-title text-center">Congrats on completing your {workoutData.name} cycle!</h3>
      <div className="grid-x">
        <div className="medium-6 small-12 plot-display">
          <Chart
            chartType="LineChart"
            loader={loader}
            data={data}
            options={options}
            width="100%"
            height="400px"
            legendToggle
          />
        </div>
        <div className="medium-6 small-12 plot-display">
          <h5>How to build your next progression:</h5>
        </div>
      </div>
      <div className="plot-display">
        This section will contain all of your workout data.
      </div>
    </div>
  )
}

export default EndOfCycleContainer
