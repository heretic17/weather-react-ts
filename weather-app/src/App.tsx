import { useState } from "react";
import axios from 'axios';

export default function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [lang, setLang] = useState('en')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${lang}&appid=5bd661ecd04dc98e3885bac5343473ff&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      setLocation('')
  }
}

  const langSelect = (e) => {
    const value = e.target.value;
    setLang(value)
  }

    return(
    <div className="app">
      <div className="language">
        <select onChange={langSelect} defaultValue={"en"}>
          <option value="en" selected>English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="tr">Turkish</option>
        </select>
      </div>
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter Location"
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="location-name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p className="weather">{data.weather[0].main}</p> : null}
          </div>
          <div className="feels">
            <p>Feels Like: {data.main ? <p>{data.main.feels_like}°C</p> : null}</p>
          </div>
          <div className="humidity">
            <p>Humidity: {data.main ? <p>{data.main.humidity}%</p> : null}</p>
          </div>
          <div className="wind">
            <p>Wind: {data.wind ? <p>{data.wind.speed} km/h</p> : null}</p>
          </div>
        </div>
        </div>
      </div>
  );
}

