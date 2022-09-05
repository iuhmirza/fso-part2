import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countriesToShow}) => {
  if(countriesToShow.length > 10) {
    return (<p>"be more specific"</p>) 
   } else {
    if(countriesToShow.length === 1) {
      return (
        <div>
          <DetailedCountry country={countriesToShow[0]} />
        </div>
      )
    } else {
      return countriesToShow.map(country => <p key={country.name.common}>{country.name.common}</p>)
    }
   }
}

const DetailedCountry = ({country}) => {
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
    </div>
  )
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