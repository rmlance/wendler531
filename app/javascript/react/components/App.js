import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IndexContainer from './IndexContainer'
import StartContainer from './StartContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexContainer}></Route>
        <Route exact path="/start" component={StartContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
