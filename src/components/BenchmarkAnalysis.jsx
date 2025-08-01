import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BenchmarkAnalysis = ({ companyData, benchmarkData }) => {
  const COLORS = ['#2563eb', '#059669', '#dc2626', '#f59e0b'];

  const profitMargin = ((companyData.revenue - companyData.expenses) / companyData.revenue * 100);
  const debtRatio = (companyData.liabilities / companyData.assets * 100);
  const roa = ((companyData.revenue - companyData.expenses) / companyData.assets * 100);

  const chartData = [
    {
      metric: 'Profit Margin %',
      company: profitMargin.toFixed(1),
      industryAvg: 15.2,
    },
    {
      metric: 'Debt Ratio %',
      company: debtRatio.toFixed(1),
      industryAvg: 35.0,
    },
    {
      metric: 'ROA %',
      company: roa.toFixed(1),
      industryAvg: 8.5,
    }
  ];

  const assetBreakdown = [
    { name: 'Equity', value: companyData.assets - companyData.liabilities },
    { name: 'Debt', value: companyData.liabilities }
  ];

  return (
    <div className="card">
      <h3 style={{ marginBottom: '24px' }}>Benchmark Analysis</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{profitMargin.toFixed(1)}%</div>
          <div className="stat-label">Profit Margin</div>
          <div style={{ fontSize: '12px', color: profitMargin > 15.2 ? '#059669' : '#dc2626', marginTop: '4px' }}>
            Industry Avg: 15.2%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{debtRatio.toFixed(1)}%</div>
          <div className="stat-label">Debt-to-Asset Ratio</div>
          <div style={{ fontSize: '12px', color: debtRatio < 35.0 ? '#059669' : '#dc2626', marginTop: '4px' }}>
            Industry Avg: 35.0%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{roa.toFixed(1)}%</div>
          <div className="stat-label">Return on Assets</div>
          <div style={{ fontSize: '12px', color: roa > 8.5 ? '#059669' : '#dc2626', marginTop: '4px' }}>
            Industry Avg: 8.5%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">${((companyData.revenue - companyData.expenses) / 1000).toFixed(0)}K</div>
          <div className="stat-label">Net Profit</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            Annual
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginTop: '32px' }}>
        <div>
          <h4 style={{ marginBottom: '16px' }}>Performance vs Industry</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="company" fill="#2563eb" name="Your Company" />
              <Bar dataKey="industryAvg" fill="#6b7280" name="Industry Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px' }}>Asset Composition</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => `${entry.name}: $${(entry.value / 1000).toFixed(0)}K`}
              >
                {assetBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: '24px' }}>
        <strong>Key Insights:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Your profit margin is {profitMargin > 15.2 ? 'above' : 'below'} industry average</li>
          <li>Debt levels are {debtRatio < 35.0 ? 'conservative' : 'elevated'} compared to peers</li>
          <li>Asset utilization efficiency is {roa > 8.5 ? 'strong' : 'below average'}</li>
        </ul>
      </div>
    </div>
  );
};

export default BenchmarkAnalysis;