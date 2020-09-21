import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import Infobox from './components/Infobox';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import Table from './components/Table';
import { sortData } from './util';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          const stortedData = sortData(data)
          setTableData(stortedData);
          setCountries(countries);
        })
    };

    getCountriesData();
  }, [])

  const handleChangeCountry = async (event) => {
    const countryCode = event.target.value

    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })

  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={handleChangeCountry}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country =>
                  <MenuItem value={country.value}>{country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
      {/* Graph */}
    </div>
  );
}

export default App;
