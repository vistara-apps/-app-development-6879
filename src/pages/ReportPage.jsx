import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { generateExecutiveSummary } from '../services/OpenAIService';
import { FileText, Lock, CreditCard, Download, Calendar, Flag } from 'lucide-react';

const ReportPage = () => {
  const navigate = useNavigate();
  const { 
    company, 
    recommendations, 
    analysisComplete, 
    reportPurchased, 
    setReportPurchased 
  } = useCompany();
  
  const { createSession } = usePaymentContext();
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!analysisComplete) {
      navigate('/onboarding');
      return;
    }

    if (reportPurchased && !executiveSummary) {
      generateSummary();
    }
  }, [reportPurchased, analysisComplete]);

  const generateSummary = async () => {
    setSummaryLoading(true);
    try {
      const summary = await generateExecutiveSummary(company, recommendations);
      setExecutiveSummary(summary);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handlePurchaseReport = async () => {
    setPaymentLoading(true);
    try {
      await createSession();
      setReportPurchased(true);
      await generateSummary();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  if (!analysisComplete) {
    return null;
  }

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={32} color="#2563eb" />
            Strategic Analysis Report - {company.name}
          </h1>
          <p style={{ color: '#6b7280' }}>
            Comprehensive business strategy recommendations based on your financial analysis.
          </p>
        </div>

        {!reportPurchased ? (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* Report Preview */}
            <div>
              <div className="card">
                <h3 style={{ marginBottom: '16px' }}>Report Preview</h3>
                <div style={{ opacity: 0.7, position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '24px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    zIndex: 10,
                    border: '2px solid #e5e7eb'
                  }}>
                    <Lock size={48} color="#6b7280" style={{ marginBottom: '16px' }} />
                    <h4>Full Report Access Required</h4>
                    <p style={{ color: '#6b7280' }}>Purchase the complete report to view all recommendations and implementation details.</p>
                  </div>

                  <h4>Executive Summary</h4>
                  <p style={{ marginBottom: '24px', filter: 'blur(3px)' }}>
                    Based on our comprehensive analysis of {company.name}'s financial statements, we have identified several strategic opportunities to enhance operational efficiency and drive sustainable growth. The company demonstrates strong fundamentals with revenue of ${(company.revenue / 1000).toFixed(0)}K and a current profit margin that positions it favorably within the {company.industry} sector...
                  </p>

                  <h4>Key Recommendations ({recommendations.length} Total)</h4>
                  <div style={{ marginBottom: '24px' }}>
                    {recommendations.slice(0, 2).map((rec, index) => (
                      <div key={index} className="recommendation-item" style={{ filter: 'blur(2px)' }}>
                        <div className="recommendation-header">
                          <h5>{rec.title}</h5>
                          <span className={`priority-${rec.priority}`}>
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        <p>{rec.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                          <Calendar size={16} color="#6b7280" />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>Timeline: {rec.timeline}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ textAlign: 'center', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                      <p style={{ color: '#6b7280' }}>+ {recommendations.length - 2} more detailed recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div>
              <div className="card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '16px' }}>Complete Strategy Report</h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#2563eb', marginBottom: '8px' }}>
                  $497
                </div>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>One-time payment</p>

                <ul style={{ marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                    Complete executive summary
                  </li>
                  <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                    {recommendations.length} strategic recommendations
                  </li>
                  <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                    Implementation roadmap
                  </li>
                  <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                    Priority rankings & timelines
                  </li>
                  <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                    Downloadable PDF report
                  </li>
                </ul>

                <button 
                  onClick={handlePurchaseReport}
                  disabled={paymentLoading}
                  className="btn btn-success"
                  style={{ width: '100%', fontSize: '16px' }}
                >
                  {paymentLoading ? (
                    <>
                      <div className="spinner" style={{ width: '20px', height: '20px', marginRight: '8px' }}></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Purchase Full Report
                    </>
                  )}
                </button>

                <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '12px' }}>
                  Secure payment powered by Web3 wallet integration
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Full Report Content
          <div>
            <div className="alert alert-success" style={{ marginBottom: '32px' }}>
              <strong>Payment Successful!</strong> You now have full access to your strategic analysis report.
            </div>

            <div style={{ marginBottom: '24px', textAlign: 'right' }}>
              <button className="btn btn-secondary">
                <Download size={20} />
                Download PDF
              </button>
            </div>

            <div className="card" style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '24px' }}>Executive Summary</h3>
              {summaryLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Generating executive summary...</p>
                </div>
              ) : (
                <div style={{ lineHeight: '1.8', fontSize: '16px' }}>
                  {executiveSummary.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '24px' }}>Strategic Recommendations</h3>
              
              <div className="recommendations">
                {recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="recommendation-header">
                      <h4 style={{ margin: 0 }}>{rec.title}</h4>
                      <span 
                        style={{ 
                          background: getPriorityColor(rec.priority),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        <Flag size={12} style={{ marginRight: '4px' }} />
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p style={{ marginBottom: '12px' }}>{rec.description}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} color="#6b7280" />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        <strong>Timeline:</strong> {rec.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;