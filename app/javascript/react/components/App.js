import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IndexContainer from './IndexContainer'
import StartContainer from './StartContainer'
import WorkoutContainer from './WorkoutContainer'
import EndOfCycleContainer from './EndOfCycleContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexContainer}></Route>
        <Route exact path="/start" component={StartContainer}></Route>
        <Route exact path="/lifts/:id" component={WorkoutContainer}></Route>
        <Route exact path="/endOfCycle/:id" component={EndOfCycleContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
