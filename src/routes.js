import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import Register from './containers/Register'
import Todo from './pages/Todo'
import Details from './pages/Details'
import Matcher from './containers/Matcher'
import Meetings from './pages/Meetings';
import AddMeeting from './containers/AddMeeting'

const routes = (
  <Route path="/" component={App}>
    <Route path="register" component={Register} />
    <Route path="todo" component={Todo} />
    <Route path="details" component={Details} />
    <Route path="matcher" component={Matcher}/>
    <Route path="meetings" component={Meetings}/>
    <Route path="addMeeting" component={AddMeeting}/>
  </Route>
)

export default routes
