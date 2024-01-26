import React, { useEffect, useState } from "react";
import axios from "axios";
import "./state.css"

function State() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [selectedcity, setSelectedcity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if(selectedcountry)
    {
    fetchStates(selectedcountry);
    }
  }, [selectedcountry]);

  useEffect(() => {
    if(selectedcountry && selectedState)
    {
    fetchCities(selectedcountry, selectedState);
    }
  }, [selectedcountry, selectedState]);



  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountries(response.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  const fetchStates = async (country) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );

      setStates(response.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  const fetchCities = async (country, state) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
   

      setCities(response.data);
      console.log('data:', response.data)
    } catch (e) {
      console.log("error", e);
    }
  };

  //  handle change
  const handlecountryChange = (e) => {
    setSelectedcountry(e.target.value);
    setselectedState("");
    setSelectedcity('');
    setCities([]);
  };
  const handlestateChange = (e) => {
    setselectedState(e.target.value);
    setSelectedcity('');
  };

  const handlecityChange = (e) => {
    setSelectedcity(e.target.value);
  };

  return (
    <div className="container" >
      <h1>Select Location</h1>
      <div className="box">
      <label>
        <select value={selectedcountry} onChange={handlecountryChange} className="dropdown">
          <option value="" disabled>Select country</option>
          {countries.map((cn, idx) => {
            return (
              <option key={idx} value={cn}>
                {cn}
              </option>
            );
          })}
        </select>
      </label>
   
        <label>
          <select value={selectedState} onChange={handlestateChange} disabled={!selectedcountry} className="dropdown">
            <option value="" disabled>Select state</option>
            {states.map((st, idx) => {
              return (
                <option key={idx} value={st}>
                  {st}
                </option>
              );
            })}
          </select>
        </label>
      
      
        <label>
          <select value={selectedcity} onChange={handlecityChange} disabled={!selectedState} className="dropdown">
            <option value="" disabled>Select city</option>
            {cities.map((city, idx) => {
              return (
                <option key={idx} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </label>
        </div>
      {selectedcity && (<h2 className="result">You selected <span className="highlight">{selectedcity}</span>
      <span className="fade">
      {" "}
      {selectedState}, {selectedcountry}</span> 
      </h2> )}
    </div>
  );
}
export default State;
