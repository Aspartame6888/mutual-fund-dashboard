import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const FundChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line', 
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: data.name,
                    data: [data.price, data.change, data.change_percent], 
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], 
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef}></canvas>;
};

export default FundChart;
