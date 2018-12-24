import React from 'react'
import Header from './Header'
import { DropdownList } from 'react-widgets'
// import { DropdownList } from 'react-widgets'
const App = ({ children }) =>
  <div>
    <Header />
    <div>
      {children}
    </div>
  </div>

export default App
