import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IndexContainer from './IndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
