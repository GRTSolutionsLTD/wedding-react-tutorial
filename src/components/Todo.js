import React from 'react'

const Todo = ({ onClick, done, task,datef,datel,notes }) =>
  <tr>
    <td className="c-todo__list_item"
      onClick={onClick}
      style={{
        textDecoration: done ? 'line-through' : 'none'
      }}
    >
      <span>
        {task}
      </span>
    </td>
    <td className="c-todo__list_item">
      <span>
        {datef}
      </span>
    </td>
    <td className="c-todo__list_item">
      <span>
        {datel}
      </span>
    </td>
    <td className="c-todo__list_item">
      <span>
        {notes}
      </span>
    </td>
  </tr>

export default Todo
