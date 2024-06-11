import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import FundAnalysis from './components/FundAnalysis';
import { Layout, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <Title level={2} style={{ color: '#fff', lineHeight: '64px', margin: 0, textAlign: 'center' }}>
          Fund Dashboard
        </Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Dashboard symbol={symbol} setSymbol={setSymbol} />
        </div>
        <div style={{ marginTop: '20px', background: '#fff', padding: 24, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <FundAnalysis symbol={symbol} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Fund Dashboard ©2024 Created by Your XieLiang</Footer>
    </Layout>
  );
}

export default App;
