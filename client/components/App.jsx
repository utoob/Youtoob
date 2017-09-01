import '../style.css'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from './Nav'
import VideoList from './VideoList'
import UploadForm from './UploadForm'
import Watch from './Watch'
import Login from './Login'
import Register from './Register'

window.api = require('../utils/api')

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path='/' component={VideoList} exact />
        <Route path='/videos/new' component={UploadForm} exact />
        <Route path='/videos/:id' component={Watch} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
      </Switch>
    </div>
  )
}

export default App