import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Landing from './pages/Landing'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  )
}
