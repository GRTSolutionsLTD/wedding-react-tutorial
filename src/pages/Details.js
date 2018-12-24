import React from 'react'
import { Helmet } from 'react-helmet'
import Details from '../containers/Details'

const DetailsPage = () => [
  <Helmet>
    <meta name="description" content="React Redux example demonstrates how to fetch API easily!" />
  </Helmet>,
  <main>
    <h3>All Details</h3>
    <Details />
  </main>
]

export default DetailsPage
