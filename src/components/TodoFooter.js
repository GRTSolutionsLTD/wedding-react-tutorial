import React from 'react'
import FilterLink from '../containers/FilterLink'

const TodoFooter = () =>
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active Test</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>

export default TodoFooter