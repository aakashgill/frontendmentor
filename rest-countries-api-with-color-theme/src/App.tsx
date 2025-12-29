import { useEffect, useState } from 'react'
import AppHeader from "./components/AppHeader";
import CountryInfo from "./components/CountryInfo";
import SingleCountryInfo from "./components/SingleCountryInfo";

const countryFetchURL = "https://restcountries.com/v3.1/all?fields=name,flags,cca3,capital,region,population";

function App() {
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  useEffect(() => {
    fetch(countryFetchURL)
      .then(country => country.json())
      .then(res => {
        setAllCountries(res);
        setCountry(res);
      });
  }, []);

  function filterByRegion(e:React.ChangeEvent<HTMLSelectElement>) {
    const selectedRegion = e.target.value.toLowerCase();
    if(selectedRegion === "") {
      setCountry(allCountries);
      return;
    }
    const filteredCountries = allCountries.filter(singleCountry =>
      singleCountry.region.toLowerCase().includes(selectedRegion)
    );
    
    setCountry(filteredCountries);

  }

  function fetchCountryInfo(cca3: any) {
    const specificCountryURL = `https://restcountries.com/v3.1/alpha/${cca3}`;
    fetch(specificCountryURL)
      .then(country => country.json())
      .then(res => setSelectedCountry(res));
  }

  function goBack() {
    setSelectedCountry(null);
  }

  function searchCountry(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toLowerCase();

    if (inputValue === "") {
      setCountry(allCountries);
      return;
    }

    const filteredCountries = allCountries.filter(singleCountry =>
      singleCountry.name.common
        .toLowerCase()
        .includes(inputValue)
    );
    
    setCountry(filteredCountries);
  }

  return (
    <>
      <AppHeader/>
      
      <div className='search'>
        <div className='container'>
          {
            !selectedCountry ? (
              <div className='filtering'>
                <div className='search-input-container'>
                  <img className='search-icon' width={18} src="/public/icon-search.svg" alt="" />
                  <input onChange={(e) => searchCountry(e)} className='search-input' type="text" placeholder='Search for a country...'/>
                </div>
                <div className='region-container'>
                  <select onChange={(e) => filterByRegion(e)} name="region" id="region" >
                    <option selected disabled value="">Filter By Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                  </select>
                </div>
              </div>
            )
            : null
          }
        </div>
      </div>
      <section className='countries'>
        <div className='container'>
          
        {
          !selectedCountry ? (
            <div className="country-listing">
            {
              country.sort(function(a,b) {
                return a.name.common.localeCompare(b.name.common);
              }).map((singleCountry, i) => {
                const {name, flags, capital, region, population, cca3} = singleCountry;
                return (
                  <div key={i} onClick={() => fetchCountryInfo(cca3)}>
                    <CountryInfo  
                      flag={flags.svg} 
                      name={name.common} 
                      population={population} 
                      region={region} 
                      capital={capital[0]} 
                    />
                  </div>
                )
              })
            }
            </div>
          )
          : 
          <>
            <button onClick={() => goBack()} type='button' className='btn-back'>
              Back
            </button>
            <SingleCountryInfo countryInfo = {selectedCountry} />
          </>
        }
        
        </div>
      </section>
    </>
  )
}

export default App
