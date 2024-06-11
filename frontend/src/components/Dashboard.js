import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundChart from './FundChart';
import { Select, notification, Card, Typography, Spin, Alert } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

const Dashboard = ({ symbol, setSymbol }) => {
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      axios.get(`http://localhost:3000/api/fund/${symbol}`)
        .then(response => {
          setFundData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the fund data!", error);
          setError("There was an error fetching the fund data!");
          setLoading(false);
          notification.error({
            message: 'Error',
            description: 'There was an error fetching the fund data!',
          });
        });
    }
  }, [symbol]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
      <Title level={1} style={{ marginBottom: '20px', textAlign: 'center' }}>
        <LineChartOutlined style={{ marginRight: '10px' }} />
        Fund Dashboard
      </Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Select
          value={symbol}
          onChange={(value) => setSymbol(value)}
          placeholder="Select fund symbol"
          style={{ width: '300px' }}
        >
          <Option value="AAPL">AAPL</Option>
          <Option value="GOOGL">GOOGL</Option>
          <Option value="MSFT">MSFT</Option>
        </Select>
      </div>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : fundData ? (
        <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <FundChart data={fundData} />
        </Card>
      ) : (
        <Text style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>No data available</Text>
      )}
    </div>
  );
};

export default Dashboard;
