
import React from 'react';
import { Line } from 'react-chartjs-2';

const FundChart = ({ data }) => {
    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: 'Fund Value',
                data: data.values,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={chartData} />;
};

export default FundChart;
