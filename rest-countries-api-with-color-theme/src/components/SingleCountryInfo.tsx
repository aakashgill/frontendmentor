import { useState, useEffect } from "react";

function SingleCountryInfo(props:any) {
  const {countryInfo} = props;
  console.log(props);
  const { flags, name, capital, region, subregion, population, borders, languages, currencies, tld } = countryInfo[0];

  const [borderNames, setBorderNames] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!borders?.length) return;
  
    const fetchBorders = async () => {
      const names = await Promise.all(
        borders.map(async (code: string) => {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${code}`
          );
          const data = await res.json();
          return (
            <span className="border-country-item">{data[0].name.common}</span>
          );
        })
      );
  
      setBorderNames(names);
    };
  
    fetchBorders();
  }, [borders]);


  return (
    <div className="info-container">
      <img className="info-flag" src={flags.svg} alt={flags.alt} />
      <div className="flag-details">
        <h2>{name.common}</h2>
        <div className="flag-details-grid">
          <p>
            <b>Native Name: </b>
            {
              
              Object.keys(name.nativeName).map(n => name.nativeName[n].common).join(', ')
            }
          </p>
          <p>
            <b>Top level Domain: </b>
            {
              tld.map((domain: string) => domain).join(", ")
            }
          </p>
          <p>
            <b>Population: </b>
            {population.toLocaleString()}
          </p>
          <p>
            <b>Currencies: </b>
            {
              Object.keys(currencies).map(cr => currencies[cr].name).join(', ')
            }
          </p>
          
          <p>
            <b>Region: </b>
            {region}
          </p>
          <p>
            <b>Languages: </b>
            {
              Object.keys(languages).map(lang => languages[lang]).join(', ')
            }
          </p>
          <p>
            <b>Subregion: </b>
            {subregion}
          </p>
          <p>
            <b>Capital: </b>
            {capital}
          </p>
          
          
        </div>

        {
          borderNames.length > 0 ? (
            <p className="border-countries">
              <b>Border Countries: </b>
              <div className="border-countries-list">
                {borderNames}
              </div>
            </p>
          ) : null
        }
      </div>
    </div>
  )
}

export default SingleCountryInfo;