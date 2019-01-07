import React from 'react'
import { Helmet } from 'react-helmet'
import Meetings from '../containers/Meetings'

/*const MeetingsPage = () => [
  <Helmet>
    <meta name="description" content="React Redux example demonstrates how to fetch API easily!" />
  </Helmet>,
  <main>
    <h3>All Meetings</h3>
    <Meetings />
  </main>
]

export default MeetingsPage */

export class MeetingsPage extends React.Component {
  render() {
    return (
      <Helmet>
        <meta name="description" content="React Redux example demonstrates how to fetch API easily!" />
      </Helmet>,
      <main>
        <h3>All Meetings</h3>
        <Meetings />
      </main>
    )
  }
}

export default MeetingsPage
