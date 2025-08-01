import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import BenchmarkAnalysis from '../components/BenchmarkAnalysis';
import { generateStrategyRecommendations } from '../services/OpenAIService';
import { Brain, CheckCircle } from 'lucide-react';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { 
    company, 
    addBenchmark, 
    addRecommendation, 
    setAnalysisComplete,
    analysisComplete 
  } = useCompany();
  
  const [loading, setLoading] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [error, setError] = useState(null);

  const analysisSteps = [
    'Analyzing financial statements...',
    'Comparing with industry benchmarks...',
    'Generating strategic insights...',
    'Creating recommendations...'
  ];

  useEffect(() => {
    if (!company.name) {
      navigate('/onboarding');
      return;
    }

    performAnalysis();
  }, []);

  const performAnalysis = async () => {
    try {
      // Simulate analysis steps
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Generate benchmark data
      const benchmarks = [
        {
          metric: 'Profit Margin',
          industry_average: '15.2%',
          company_value: `${(((company.revenue - company.expenses) / company.revenue) * 100).toFixed(1)}%`
        },
        {
          metric: 'Debt-to-Asset Ratio',
          industry_average: '35.0%',
          company_value: `${((company.liabilities / company.assets) * 100).toFixed(1)}%`
        },
        {
          metric: 'ROA',
          industry_average: '8.5%',
          company_value: `${(((company.revenue - company.expenses) / company.assets) * 100).toFixed(1)}%`
        }
      ];

      benchmarks.forEach(benchmark => addBenchmark(benchmark));

      // Generate AI recommendations
      const recommendations = await generateStrategyRecommendations(company, benchmarks);
      recommendations.forEach(rec => addRecommendation(rec));

      setAnalysisComplete(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to complete analysis. Please try again.');
      setLoading(false);
      console.error('Analysis error:', err);
    }
  };

  if (!company.name) {
    return null;
  }

  if (error) {
    return (
      <div style={{ padding: '40px 0', minHeight: '80vh' }}>
        <div className="container">
          <div className="alert alert-error">
            {error}
            <br />
            <button 
              onClick={() => navigate('/onboarding')}
              className="btn btn-primary"
              style={{ marginTop: '16px' }}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !analysisComplete) {
    return (
      <div style={{ padding: '40px 0', minHeight: '80vh' }}>
        <div className="container">
          <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <Brain size={64} color="#2563eb" style={{ margin: '0 auto 24px' }} />
            <h2 style={{ marginBottom: '16px' }}>Analyzing Your Business</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>
              Our AI is processing your financial data and generating strategic insights...
            </p>
            
            <div className="loading">
              <div className="spinner"></div>
              <p>{analysisSteps[analysisStep]}</p>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={32} color="#059669" />
            Analysis Complete for {company.name}
          </h1>
          <p style={{ color: '#6b7280' }}>
            We've analyzed your financial data and generated strategic recommendations.
          </p>
        </div>

        <BenchmarkAnalysis 
          companyData={company}
          benchmarkData={[
            { metric: 'Profit Margin', industry_average: 15.2, company_value: (((company.revenue - company.expenses) / company.revenue) * 100) },
            { metric: 'Debt Ratio', industry_average: 35.0, company_value: ((company.liabilities / company.assets) * 100) },
            { metric: 'ROA', industry_average: 8.5, company_value: (((company.revenue - company.expenses) / company.assets) * 100) }
          ]}
        />

        <div className="alert alert-success" style={{ marginTop: '32px' }}>
          <strong>Analysis Summary:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Financial statements processed and validated</li>
            <li>Industry benchmarks compared across key metrics</li>
            <li>Strategic opportunities identified</li>
            <li>Custom recommendations generated</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button 
            onClick={() => navigate('/report')}
            className="btn btn-primary"
            style={{ fontSize: '18px', padding: '16px 32px' }}
          >
            View Your Strategy Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;