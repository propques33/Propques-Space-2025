import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.propques.space/api/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex">
      <div className="w-1/4 bg-red-400">

      </div>
      <div className="w-3/4 px-4">
      
      </div>
     
    </div>
  );
};

export default PropertyList;
