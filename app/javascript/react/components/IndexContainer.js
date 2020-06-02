import React from 'react'
import { render } from "react-dom";
import { Chart } from "react-google-charts";

const IndexContainer = props => {
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
