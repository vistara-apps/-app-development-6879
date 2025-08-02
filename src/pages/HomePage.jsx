import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, Target, Zap, Shield, Award } from 'lucide-react';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>McKinsey-Level Strategy Reports for SMBs</h1>
          <p>Get AI-powered business strategy consultations tailored to your financial data. Comprehensive analysis and actionable recommendations for just $497.</p>
          <Link to="/onboarding" className="btn btn-primary btn-large">
            Get Your Strategy Report
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '36px', fontWeight: '700' }}>
            Professional Strategy Analysis
          </h2>
          
          <div className="features-grid">
            <div className="feature-card card">
              <div className="icon">
                <FileText size={32} />
              </div>
              <h3>Financial Statement Analysis</h3>
              <p>Automatically aggregate and analyze your income statements, balance sheets, and cash flow statements for comprehensive insights.</p>
            </div>

            <div className="feature-card card">
              <div className="icon">
                <Target size={32} />
              </div>
              <h3>Industry Benchmarking</h3>
              <p>Compare your performance against industry peers and identify areas where you're leading or lagging behind competitors.</p>
            </div>

            <div className="feature-card card">
              <div className="icon">
                <Zap size={32} />
              </div>
              <h3>AI-Powered Recommendations</h3>
              <p>Receive customized strategic recommendations based on your unique financial profile and business context.</p>
            </div>

            <div className="feature-card card">
              <div className="icon">
                <TrendingUp size={32} />
              </div>
              <h3>Growth Strategy</h3>
              <p>Get actionable plans to improve profitability, optimize operations, and accelerate sustainable business growth.</p>
            </div>

            <div className="feature-card card">
              <div className="icon">
                <Shield size={32} />
              </div>
              <h3>Risk Assessment</h3>
              <p>Identify potential financial risks and receive strategies to mitigate them before they impact your business.</p>
            </div>

            <div className="feature-card card">
              <div className="icon">
                <Award size={32} />
              </div>
              <h3>Implementation Roadmap</h3>
              <p>Get detailed implementation timelines and priority rankings to execute your strategy effectively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '36px', fontWeight: '700' }}>
            How It Works
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
                fontWeight: '700',
                color: '#2563eb'
              }}>
                1
              </div>
              <h3>Upload Your Financials</h3>
              <p style={{ color: '#6b7280' }}>Upload your financial statements or enter data manually. We support PDF, Excel, and CSV formats.</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
                fontWeight: '700',
                color: '#2563eb'
              }}>
                2
              </div>
              <h3>AI Analysis</h3>
              <p style={{ color: '#6b7280' }}>Our AI analyzes your data, compares it with industry benchmarks, and identifies strategic opportunities.</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
                fontWeight: '700',
                color: '#2563eb'
              }}>
                3
              </div>
              <h3>Get Your Report</h3>
              <p style={{ color: '#6b7280' }}>Receive a comprehensive strategy report with actionable recommendations and implementation roadmap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '36px', fontWeight: '700' }}>
              Professional Strategy Report
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '18px' }}>
              Get the same quality analysis that Fortune 500 companies pay tens of thousands for.
            </p>
            
            <div className="card card-premium" style={{ padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#2563eb', marginBottom: '16px' }}>
                $497
              </div>
              <div style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
                One-time payment per report
              </div>
              
              <ul style={{ textAlign: 'left', marginBottom: '32px', listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                  Complete financial analysis and benchmarking
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                  5-7 customized strategic recommendations
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                  Detailed implementation roadmap
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                  Executive summary for stakeholders
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#059669', marginRight: '12px' }}>✓</span>
                  Priority rankings and timelines
                </li>
              </ul>
              
              <Link to="/onboarding" className="btn btn-primary btn-large w-full">
                Start Your Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '36px', fontWeight: '700' }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{ marginBottom: '32px', fontSize: '18px', opacity: 0.9 }}>
            Join hundreds of SMBs that have already improved their performance with StrategyGPT.
          </p>
          <Link to="/onboarding" className="btn" style={{ 
            background: 'white', 
            color: '#2563eb', 
            fontSize: '18px', 
            padding: '16px 32px',
            fontWeight: '600'
          }}>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
