"use client"

import { useEffect, useState } from "react";
import axios from 'axios';

export default function App() {

  type WeatherData = {
    main?: {
      humidity: number,
      temp: number,
      feels_like: number
    }
    name?: string,
    weather?: {
      0: {
        main: string
      }
    }
    wind?: {
      speed: number
    }
  }

  const [data, setData] = useState<WeatherData>({})
  const [location, setLocation] = useState('')
  const [lang, setLang] = useState('en')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${lang}&appid=5bd661ecd04dc98e3885bac5343473ff&units=metric`

  const searchLocation = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      setLocation('')
  }
}

  const langSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value)
  }
  const handleResize = () => {
    const keyboardOpen = window.innerHeight < window.screen.height * 0.75;
    setIsKeyboardOpen(keyboardOpen);

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call the handler immediately to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    return(
    <>
      <div className="language">
      <label htmlFor="sel1">Language:</label>
        <select id="sel1" onChange={langSelect}>
          <option value="en" defaultValue={"en"}>English</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
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
    <div className="app">
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
          </div>
        <div className="bottom" style={{ marginBottom: isKeyboardOpen ? '50vh' : '1vh', marginTop: isMobile ? (isKeyboardOpen ? '-50vh' : '-25vh') : '0' }}>

          <div className="feels">
            <p>Feels Like: {data.main ? <span>{data.main.feels_like}°C</span> : null}</p>
          </div>
          <div className="humidity">
            <p>Humidity: {data.main ? <span>{data.main.humidity}%</span> : null}</p>
          </div>
          <div className="wind">
            <p>Wind: {data.wind ? <span>{data.wind.speed} km/h</span> : null}</p>
          </div>
        </div>
        </div>
        </div>
    </>
  );
}

