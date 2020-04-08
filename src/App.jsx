import React, { useState, useEffect } from 'react';

import axios from 'axios';
import * as moment from 'moment';

import { Container, FormControl, Select, MenuItem, makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import WorldChart from './components/Charts/WorldChart';
import CountryChart from './components/Charts/CountryChart';
import Header from './components/Header/Header';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [allCountriesData, setAllCountriesData] = useState({});

  useEffect(() => {
    const url = 'https://corona.lmao.ninja/countries'
    const urlAll = 'https://corona.lmao.ninja/all'
    axios.all([axios.get(url), axios.get(urlAll)])
      .then(res => {
        console.log(res);
        let sortedData = res[0].data.sort((a, b) => a.country.localeCompare(b.country));
        setCountries(sortedData);
        setAllCountriesData(res[1].data);
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    let url = 'https://corona.lmao.ninja/countries'
    axios.get(`${url}/${event.target.value}`)
      .then(res => {
        console.log(res.data);
        setSelectedCountryData(res.data);
      })
      .catch(err => console.log(err));
  };

  const dateSelectedCountry = moment(selectedCountryData.updated).format("DD MMM YYYY hh:mm a");
  const dateWorld = moment(allCountriesData.updated).format("DD MMM YYYY hh:mm a");

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: '2rem',
    },

    bold: { fontWeight: 'bold' },

    centerContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    }

  }));

  const classes = useStyles();

  // Return object
  const formattedWorldContent = () => {
    return allCountriesData;
  }

  // Return object
  const formattedSelectedCountryContent = () => {
    return selectedCountryData;
  }

  // Return string
  const addCommas = (nStr) => {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1,$2`);
    }
    return x1 + x2;
  }

  const sortDataAlphabetical = () => {
      // countries.map((country, index) => (
      //   <MenuItem key={index} value={country.country}>{country.country}</MenuItem>
      // ))
      // let sortedData = countries.sort((a, b) => a.country.localCompare(b.country))
      // console.log(sortedData);
  }

  sortDataAlphabetical();

  // Selected a country
  const renderSelectedCountryContent = () => {
    return (
      <React.Fragment>
        <Header />
        <Container maxWidth="md" >

          <Paper style={{ marginTop: '1rem' }} className={classes.paper}>
            <Typography variant="h2" component="h2" gutterBottom>
              <span className={classes.bold}>
                {selectedCountryData.country !== undefined ? addCommas(selectedCountryData.country) : "No data found!"}
              </span> <br />
            </Typography>
            <Typography>
              Last update: <span className={classes.bold}> {dateSelectedCountry}</span>

            </Typography>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                Deaths:
                <span className={classes.bold}>
                  {selectedCountryData.deaths !== undefined ? addCommas(selectedCountryData.deaths) : "No data found!"}
                </span>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                Cases:
                <span className={classes.bold}>
                  {selectedCountryData.cases !== undefined ? addCommas(selectedCountryData.cases) : "No data found!"}
                </span>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                Recovered:
                <span className={classes.bold}>
                  {selectedCountryData.recovered !== undefined ? addCommas(selectedCountryData.recovered) : "No data found"}
                </span>
              </Paper>
            </Grid>
          </Grid>

          <div className={classes.centerContainer}>
            <FormControl style={{ width: '100%' }}>
              <Select
                placeholder="Select a country"
                style={{ width: '100%' }}
                labelId="label"
                id="label"
                defaultValue={"Belgium"}
                value={selectedCountry ? selectedCountry : " "}
                onChange={handleChange}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.country}>{country.country}</MenuItem>
                ))}

              </Select>
            </FormControl>

          </div>

          <CountryChart data={formattedSelectedCountryContent()} />
        </Container>

      </React.Fragment >
    )
  }

  // World data
  const renderWorldContent = () => {
    return (
      <React.Fragment>
        <Header />
        <Container maxWidth="md" >
          <Paper className={classes.paper}>
            <Typography variant="h2" component="h2" gutterBottom>
              <span className={classes.bold}>World</span>
            </Typography>
            <Typography>
              Last update: <span className={classes.bold}>{dateWorld}</span>
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                Deaths:
                <span className={classes.bold}>
                  {addCommas(allCountriesData.deaths)} <br />
                </span>
              </Paper>
            </Grid>
            <Grid item xs>

              <Paper className={classes.paper}>
                Cases:
                <span className={classes.bold}>
                  {addCommas(allCountriesData.cases)}
                </span>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                Recovered:
                <span className={classes.bold}>
                  {addCommas(allCountriesData.recovered)}
                </span>
              </Paper>
            </Grid>
          </Grid>

          <div className={classes.centerContainer}>

            <FormControl style={{ width: '100%' }}>
              <Select
                placeholder="Select a country"
                style={{ width: '100%' }}
                labelId="label"
                id="label"
                defaultValue={"Belgium"}
                value={selectedCountry ? selectedCountry : " "}
                onChange={handleChange}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.country}>{country.country}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>
          <WorldChart data={formattedWorldContent()} />

        </Container>

      </React.Fragment>
    )
  }

  return (
    Object.keys(selectedCountryData).length ?
      renderSelectedCountryContent() : renderWorldContent()
  )
}

export default App;
