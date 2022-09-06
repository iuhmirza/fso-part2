import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countriesToShow}) => {
  if(countriesToShow.length > 10) {
    return (<p>Too many matches, specify another filter.</p>) 
   } else {
    if(countriesToShow.length === 1) {
      return (
        <div>
          <DetailedCountry country={countriesToShow[0]} />
        </div>
      )
    } else {
      return countriesToShow.map(country => {
        return (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <ShowCountry country = {country}/>
          </div>
        )
      })
    }
   }
}

const ShowCountry = ({country}) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {show ? <DetailedCountry country = {country} /> : <></> }
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
    </div>
  )
}

const DetailedCountry = ({country}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])

  if(!weather) {
    return null
  } else {
    return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Spoken Languages</h3>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt={'flag'}/>
          <h1>Weather in {country.name.common}</h1>
          <p>temperature {(weather.main.temp - 273.15).toFixed(2)} celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather icon'}/>
          <p>wind speed {weather.wind.speed} m/s</p>
        </div>
      )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    <div>
      <input
        value = {filter}
        onChange = {handleFilterChange}
       />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App