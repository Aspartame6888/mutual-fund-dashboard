// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FundChart from './FundChart';

const Dashboard = () => {
    const [fundData, setFundData] = useState(null);
    const [symbol, setSymbol] = useState('AAPL');

    useEffect(() => {
        axios.get(`/api/fund/${symbol}`)
            .then(response => {
                setFundData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the fund data!", error);
            });
    }, [symbol]);

    return (
        <div>
            <h1>Fund Dashboard</h1>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter fund symbol"
            />
            {fundData && <FundChart data={fundData} />}
        </div>
    );
};

export default Dashboard;
