import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const FinancialUpload = ({ onDataParsed }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('manual');

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    // For demo purposes, we'll simulate file parsing
    console.log('Files uploaded:', files);
    
    // Simulate parsed financial data
    const sampleData = {
      incomeStatements: [
        { year: 2023, revenue: 500000, expenses: 350000, netIncome: 150000 },
        { year: 2022, revenue: 450000, expenses: 320000, netIncome: 130000 },
        { year: 2021, revenue: 400000, expenses: 300000, netIncome: 100000 }
      ],
      balanceSheet: {
        assets: 800000,
        liabilities: 300000,
        equity: 500000
      },
      cashFlow: {
        operatingCashFlow: 180000,
        investingCashFlow: -50000,
        financingCashFlow: -30000
      }
    };

    if (onDataParsed) {
      onDataParsed(sampleData);
    }
  };

  if (uploadMethod === 'manual') {
    return (
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Upload Method</h3>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button
            className={`btn ${uploadMethod === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setUploadMethod('manual')}
          >
            Manual Entry
          </button>
          <button
            className={`btn ${uploadMethod === 'file' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setUploadMethod('file')}
          >
            File Upload
          </button>
        </div>

        <ManualDataEntry onDataSubmit={onDataParsed} />
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px' }}>Upload Financial Documents</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button
          className={`btn ${uploadMethod === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setUploadMethod('manual')}
        >
          Manual Entry
        </button>
        <button
          className={`btn ${uploadMethod === 'file' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setUploadMethod('file')}
        >
          File Upload
        </button>
      </div>

      <div
        className={`file-upload ${dragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload size={48} style={{ color: '#6b7280', marginBottom: '16px' }} />
        <h4>Drop financial documents here</h4>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          or click to select files
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.csv,.xlsx,.xls"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-secondary">
          <FileText size={20} />
          Select Files
        </label>
        <div className="alert alert-info" style={{ marginTop: '16px', textAlign: 'left' }}>
          <AlertCircle size={20} style={{ marginRight: '8px' }} />
          Supported formats: PDF, CSV, Excel (XLS, XLSX)
          <br />
          Documents: Income statements, Balance sheets, Cash flow statements
        </div>
      </div>
    </div>
  );
};

const ManualDataEntry = ({ onDataSubmit }) => {
  const [formData, setFormData] = useState({
    revenue2023: '',
    expenses2023: '',
    revenue2022: '',
    expenses2022: '',
    revenue2021: '',
    expenses2021: '',
    totalAssets: '',
    totalLiabilities: '',
    operatingCashFlow: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      incomeStatements: [
        { 
          year: 2023, 
          revenue: parseFloat(formData.revenue2023), 
          expenses: parseFloat(formData.expenses2023), 
          netIncome: parseFloat(formData.revenue2023) - parseFloat(formData.expenses2023)
        },
        { 
          year: 2022, 
          revenue: parseFloat(formData.revenue2022), 
          expenses: parseFloat(formData.expenses2022), 
          netIncome: parseFloat(formData.revenue2022) - parseFloat(formData.expenses2022)
        },
        { 
          year: 2021, 
          revenue: parseFloat(formData.revenue2021), 
          expenses: parseFloat(formData.expenses2021), 
          netIncome: parseFloat(formData.revenue2021) - parseFloat(formData.expenses2021)
        }
      ],
      balanceSheet: {
        assets: parseFloat(formData.totalAssets),
        liabilities: parseFloat(formData.totalLiabilities),
        equity: parseFloat(formData.totalAssets) - parseFloat(formData.totalLiabilities)
      },
      cashFlow: {
        operatingCashFlow: parseFloat(formData.operatingCashFlow),
        investingCashFlow: 0,
        financingCashFlow: 0
      }
    };

    onDataSubmit(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 style={{ marginBottom: '24px' }}>Financial Data Entry</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div>
          <h5 style={{ marginBottom: '16px' }}>Income Statement - 2023</h5>
          <div className="form-group">
            <label>Revenue ($)</label>
            <input
              type="number"
              name="revenue2023"
              value={formData.revenue2023}
              onChange={handleChange}
              placeholder="500000"
              required
            />
          </div>
          <div className="form-group">
            <label>Operating Expenses ($)</label>
            <input
              type="number"
              name="expenses2023"
              value={formData.expenses2023}
              onChange={handleChange}
              placeholder="350000"
              required
            />
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: '16px' }}>Income Statement - 2022</h5>
          <div className="form-group">
            <label>Revenue ($)</label>
            <input
              type="number"
              name="revenue2022"
              value={formData.revenue2022}
              onChange={handleChange}
              placeholder="450000"
              required
            />
          </div>
          <div className="form-group">
            <label>Operating Expenses ($)</label>
            <input
              type="number"
              name="expenses2022"
              value={formData.expenses2022}
              onChange={handleChange}
              placeholder="320000"
              required
            />
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: '16px' }}>Income Statement - 2021</h5>
          <div className="form-group">
            <label>Revenue ($)</label>
            <input
              type="number"
              name="revenue2021"
              value={formData.revenue2021}
              onChange={handleChange}
              placeholder="400000"
              required
            />
          </div>
          <div className="form-group">
            <label>Operating Expenses ($)</label>
            <input
              type="number"
              name="expenses2021"
              value={formData.expenses2021}
              onChange={handleChange}
              placeholder="300000"
              required
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
        <div>
          <h5 style={{ marginBottom: '16px' }}>Balance Sheet</h5>
          <div className="form-group">
            <label>Total Assets ($)</label>
            <input
              type="number"
              name="totalAssets"
              value={formData.totalAssets}
              onChange={handleChange}
              placeholder="800000"
              required
            />
          </div>
          <div className="form-group">
            <label>Total Liabilities ($)</label>
            <input
              type="number"
              name="totalLiabilities"
              value={formData.totalLiabilities}
              onChange={handleChange}
              placeholder="300000"
              required
            />
          </div>
        </div>

        <div>
          <h5 style={{ marginBottom: '16px' }}>Cash Flow</h5>
          <div className="form-group">
            <label>Operating Cash Flow ($)</label>
            <input
              type="number"
              name="operatingCashFlow"
              value={formData.operatingCashFlow}
              onChange={handleChange}
              placeholder="180000"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ marginTop: '24px' }}>
        Process Financial Data
      </button>
    </form>
  );
};

export default FinancialUpload;