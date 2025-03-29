import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Home2 from '../pages/Home2.jsx';
import ProjectPage from '../components/ProjectPage.jsx';
import ViewAllProperties from '../components/ViewAllProperties.jsx';
import SearchResult from '../pages/SearchResult.jsx';

function App() {
  return (
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/commercial-propert-leasing-and-sale" element={<Home2 />} />
        <Route path="/view-all-properties" element={< ViewAllProperties  />} />
        <Route path="/search" element={< SearchResult  />} />
      </Routes>
  );
}

export default App;
