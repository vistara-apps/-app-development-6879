import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Shield, CheckCircle, X } from 'lucide-react';

const FinancialUpload = ({ onDataParsed }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('manual');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    // Validate files
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    if (validFiles.length === 0) {
      alert('Please upload valid files (PDF, Excel, or CSV) under 10MB');
      return;
    }

    setUploadedFiles(validFiles);
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate processing delay
          setTimeout(() => {
            processFiles(validFiles);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const processFiles = (files) => {
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

    // Simulate processing delay and call the callback
    setTimeout(() => {
      setIsProcessing(false);
      if (onDataParsed) {
        onDataParsed(sampleData);
      }
    }, 2000);
  };

  const removeFile = (index) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
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
      <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem' }}>
        Upload Financial Documents
      </h3>
      
      {/* Security Message */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--success) 0%, var(--primary-100) 100%)',
        border: '1px solid var(--primary-200)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md)',
        marginBottom: 'var(--space-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)'
      }}>
        <Shield size={20} color="var(--primary-600)" />
        <span style={{ color: 'var(--primary-700)', fontSize: '0.9rem', fontWeight: '500' }}>
          Your financial data is encrypted and secure. We never store your documents.
        </span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
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

      {!isProcessing ? (
        <div
          className={`file-upload-enhanced ${dragOver ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload size={64} style={{ color: 'var(--primary-400)', marginBottom: 'var(--space-lg)' }} />
          <h4 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: 'var(--space-sm)',
            color: 'var(--gray-800)'
          }}>
            Drop financial documents here
          </h4>
          <p style={{ 
            color: 'var(--gray-600)', 
            marginBottom: 'var(--space-lg)',
            fontSize: '1rem'
          }}>
            or click to select files from your computer
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.csv,.xlsx,.xls"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="btn btn-primary">
            <FileText size={20} />
            Select Files
          </label>
          
          <div style={{
            marginTop: 'var(--space-xl)',
            padding: 'var(--space-lg)',
            background: 'var(--gray-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <AlertCircle size={18} style={{ marginRight: 'var(--space-xs)', color: 'var(--primary-600)' }} />
              <span style={{ fontWeight: '600', color: 'var(--gray-800)', fontSize: '0.9rem' }}>
                Supported File Types
              </span>
            </div>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem', margin: 0 }}>
              <strong>Formats:</strong> PDF, CSV, Excel (XLS, XLSX) • <strong>Max size:</strong> 10MB per file
              <br />
              <strong>Documents:</strong> Income statements, Balance sheets, Cash flow statements
            </p>
          </div>
        </div>
      ) : (
        <div style={{
          padding: 'var(--space-3xl)',
          textAlign: 'center',
          background: 'var(--gray-50)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--gray-200)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto var(--space-lg)',
            background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Upload size={32} color="var(--primary-600)" />
          </div>
          <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--gray-800)' }}>
            Processing Your Documents
          </h4>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--gray-200)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: 'var(--space-md)'
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%)',
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }} />
          </div>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
            {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Analyzing financial data...'}
          </p>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && !isProcessing && (
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <h5 style={{ marginBottom: 'var(--space-md)', color: 'var(--gray-800)' }}>
            Uploaded Files ({uploadedFiles.length})
          </h5>
          {uploadedFiles.map((file, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-md)',
              background: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FileText size={20} color="var(--primary-600)" />
                <div>
                  <p style={{ margin: 0, fontWeight: '500', color: 'var(--gray-800)' }}>
                    {file.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <CheckCircle size={16} color="var(--success)" />
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--gray-400)',
                    padding: '4px'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
