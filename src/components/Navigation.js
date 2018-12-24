import React from 'react'
import { Link } from 'react-router'

const Navigation = ({ className, buttonClassName }) =>
  <nav className={className}>
    <Link className={buttonClassName} to="register">
      Add
    </Link>
    {/* reduser  בלינק מקשרים ל */}
     <Link className={buttonClassName} to="todo">
      Grid
    </Link>
    <Link className={buttonClassName} to="matcher">
    matcher
    </Link>
    <Link className={buttonClassName} to="details">
    Details
    </Link>
  </nav>

Navigation.defaultProps = {
  className: '',
  buttonClassName: 'c-button'
}

export default Navigation
