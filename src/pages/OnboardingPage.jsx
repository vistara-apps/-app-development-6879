import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import FinancialUpload from '../components/FinancialUpload';
import { Building, Industry, DollarSign } from 'lucide-react';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { updateCompany, addFinancialStatement } = useCompany();
  const [step, setStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    industry: '',
    revenue: '',
    expenses: '',
    assets: '',
    liabilities: ''
  });

  const handleCompanyInfoSubmit = (e) => {
    e.preventDefault();
    updateCompany(companyInfo);
    setStep(2);
  };

  const handleFinancialDataParsed = (financialData) => {
    // Process the financial data and update company info
    const currentYear = financialData.incomeStatements[0];
    
    updateCompany({
      revenue: currentYear.revenue,
      expenses: currentYear.expenses,
      assets: financialData.balanceSheet.assets,
      liabilities: financialData.balanceSheet.liabilities
    });

    // Add financial statements to context
    financialData.incomeStatements.forEach(statement => {
      addFinancialStatement({
        type: 'income',
        year: statement.year,
        data: statement
      });
    });

    navigate('/analysis');
  };

  const handleChange = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh', background: '#f9fafb' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '32px' }}>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#2563eb', fontWeight: '600' }}>Company Info</span>
              <span style={{ color: step === 2 ? '#2563eb' : '#6b7280', fontWeight: '600' }}>Financial Data</span>
            </div>
          </div>

          {step === 1 && (
            <div className="card">
              <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Building size={32} color="#2563eb" />
                Tell Us About Your Company
              </h2>
              
              <form onSubmit={handleCompanyInfoSubmit}>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Industry</label>
                  <select
                    name="industry"
                    value={companyInfo.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Construction">Construction</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="alert alert-info">
                  <strong>Why we need this information:</strong>
                  <br />
                  Your company details help us provide more accurate industry benchmarks and tailored strategic recommendations.
                </div>

                <button type="submit" className="btn btn-primary">
                  Continue to Financial Data
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DollarSign size={32} color="#2563eb" />
                Upload Your Financial Data
              </h2>
              
              <FinancialUpload onDataParsed={handleFinancialDataParsed} />
              
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button 
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  Back to Company Info
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;