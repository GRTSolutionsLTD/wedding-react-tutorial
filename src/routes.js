import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import Register from './containers/Register'
import Todo from './pages/Todo'
import Details from './pages/Details'
import Matcher from './containers/Matcher'


const routes = (
  <Route path="/" component={App}>
    <Route path="register" component={Register} />
    <Route path="todo" component={Todo} />
    <Route path="details" component={Details} />
    <Route path="matcher" component={Matcher}/>
  </Route>
)

export default routes
