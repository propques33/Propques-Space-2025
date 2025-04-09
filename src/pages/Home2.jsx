import React, { useEffect } from 'react'
import Banner from '../components/Commercial Office Leasing & Sales/Banner'
import CommercialListing from '../components/Commercial Office Leasing & Sales/CommercialListing'
import LocationFilter from '../components/Commercial Office Leasing & Sales/LocationFilter'
import ViewAllPropertiesButton from '../components/Commercial Office Leasing & Sales/ViewAllPropertiesButton.jsx'
import CoworkingCentersBanner from '../components/CoworkingCentersBanner.jsx'
import CoworkingHighlight from '../components/CoworkingHighlight.jsx'
import CoworkingBenefits from '../components/CoworkingBenefits.jsx'
import FAQSection from '../components/FAQSection.jsx'
import PropquesOverview from '../components/PropquesOverview.jsx'
const Home2 = (setFilters ) => {
  useEffect(() => {
    // Ensure scrolling to the top of the document when the component is mounted
    window.scrollTo({
      top: 0,
      behavior: "auto", // You can use "auto" for instant scroll
    });

    // As a fallback, scroll the root element
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Banner setFilters={setFilters}  />
      <CommercialListing />
      <LocationFilter />
      <CoworkingHighlight />
      <ViewAllPropertiesButton />
      <CoworkingBenefits />
      <PropquesOverview />
      <FAQSection />
      <CoworkingCentersBanner />
    </div>
  )
}

export default Home2
