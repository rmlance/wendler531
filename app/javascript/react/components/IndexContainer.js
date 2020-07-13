import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import { Link, Redirect } from 'react-router-dom'
import { Chart } from "react-google-charts";
import _ from 'lodash'
import LiftBlock from './LiftBlock'

const IndexContainer = props => {
  const [liftData, setLiftData] = useState([])
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetch('api/v1/lifts', {
      credentials: "same-origin"
    })
    .then((response) => {
      if (response.ok) {
        return response
      }else {
        let errorMessage = `You've hit an error: ${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => response.json())
    .then((parsedLiftData) => {
      setLiftData(parsedLiftData)
      if (_.isEmpty(parsedLiftData)) {
        setRedirect(true)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  if (redirect) {
    return <Redirect to={`/start`} />
  }

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
      if (item.workouts[n] && item.workouts[n].completed == true) {
        let dataPoint = [item.workouts[n].created_at.slice(0, 10), null, null, null, null]
        switch (item.name) {
          case "Back Squat":
            dataPoint[1] = item.workouts[n].projected_1rm
            break;
          case "Bench Press":
            dataPoint[2] = item.workouts[n].projected_1rm
          break;
        case "Deadlift":
            dataPoint[3] = item.workouts[n].projected_1rm
          break;
        case "Overhead Press":
          dataPoint[4] = item.workouts[n].projected_1rm
          break;
        }
        data.push(dataPoint)
      }
    })
    n++
  }

  const liftBlocks = liftData.map(lift => {
    return (
      <div className="lift-block medium-3 small-6" key={lift.id}>
        <LiftBlock
          name={lift.name}
          projected_1rm={lift.workouts[lift.workouts.length -1].projected_1rm}
          linkId={lift.id}
        />
      </div>
    )
  })

  const options = {
    title: "Projected One-Rep Max Progression",
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

  let loader = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div></div>

  return (
    <div className="grid-container fluid grid-x home-region">
      <div className="cell medium-5 small-12 plot-display">
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
      <div className="cell medium-7 small-12">
        <div className="grid-container grid-x">
          {liftBlocks}
          <Link className="button cell medium-6 text-center build-new-progression" to={`/start`}>Build New Progression</Link>
        </div>
      </div>
    </div>
  )
}

export default IndexContainer
