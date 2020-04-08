import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';

const CountryChart = ({ data }) => {
    console.log(typeof data);
    const initialState = {
        labels: ['Deaths', 'Cases', 'Recovered'],
        datasets: [
            {
                label: 'World Data',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [data.deaths, data.cases, data.recovered]
            }
        ]
    };
    return (
        <div>
            <Bar data={initialState} />
        </div>
    )
}

CountryChart.propTypes = {
    data: PropTypes.object,
}

export default CountryChart
