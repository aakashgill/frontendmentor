interface CountryInformation {
  flag: string,
  name: string,
  population: number,
  region: string,
  capital: string
}

function CountryInfo({flag, name, population, region, capital}: CountryInformation) {
  return (
    <div className="country-item">
      <div className="flag-image-container">
        <img className="country-flag" src={flag} alt="" height={80}/>
      </div>
      <div className="country-info">
        <h2>{name}</h2>
        <p>
          <b>Population:</b>
          {population.toLocaleString()}
        </p>
        <p>
          <b>Region:</b>
          {region}
        </p>
        <p>
          <b>Capital:</b>
          {capital}
        </p>
      </div>
    </div>
  )
}

export default CountryInfo;