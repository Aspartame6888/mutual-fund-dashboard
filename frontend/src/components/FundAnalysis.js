import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Spin, Alert } from "antd";
import { DollarCircleOutlined, RiseOutlined, FallOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const FundAnalysis = ({ symbol }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/api/analyze/${symbol}`)
        .then((response) => {
          setAnalysis(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the analysis data!", error);
          setError("There was an error fetching the analysis data!");
          setLoading(false);
        });
    }
  }, [symbol]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
      <Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>Fund Analysis</Title>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : analysis ? (
        <Card style={{ maxWidth: '400px', margin: '0 auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={3} style={{ textAlign: 'center' }}>{analysis.name}</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <DollarCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Text style={{ fontSize: '24px' }}>{analysis.price}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <RiseOutlined style={{ fontSize: '24px', color: analysis.change > 0 ? '#52c41a' : '#ff4d4f' }} />
            <Text style={{ fontSize: '24px', color: analysis.change > 0 ? '#52c41a' : '#ff4d4f' }}>{analysis.change}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FallOutlined style={{ fontSize: '24px', color: analysis.change_percent > 0 ? '#52c41a' : '#ff4d4f' }} />
            <Text style={{ fontSize: '24px', color: analysis.change_percent > 0 ? '#52c41a' : '#ff4d4f' }}>{analysis.change_percent}%</Text>
          </div>
        </Card>
      ) : (
        <Text style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>No analysis data available.</Text>
      )}
    </div>
  );
};

export default FundAnalysis;
