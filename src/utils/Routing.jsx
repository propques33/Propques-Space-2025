import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Home2 from '../pages/Home2.jsx';
import ProjectPage from '../components/ProjectPage.jsx';

function App() {
  return (
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/commercial-propert-leasing-and-sale" element={<Home2 />} />
      </Routes>
  );
}

export default App;
