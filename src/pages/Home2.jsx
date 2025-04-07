import React from 'react'
import Banner from '../components/Commercial Office Leasing & Sales/Banner'
import CommercialListing from '../components/Commercial Office Leasing & Sales/CommercialListing'
import LocationFilter from '../components/Commercial Office Leasing & Sales/LocationFilter'
import ViewAllPropertiesButton from '../components/Commercial Office Leasing & Sales/ViewAllPropertiesButton.jsx'
import CoworkingCentersBanner from '../components/CoworkingCentersBanner.jsx'

const Home2 = (setFilters ) => {

  return (
    <div>
      <Banner setFilters={setFilters}  />
      <CommercialListing />
      <LocationFilter />
      <ViewAllPropertiesButton />
      <CoworkingCentersBanner />
    </div>
  )
}

export default Home2
