import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState({
    name: '',
    industry: '',
    revenue: '',
    expenses: '',
    assets: '',
    liabilities: ''
  });

  const [financialStatements, setFinancialStatements] = useState([]);
  const [benchmarks, setBenchmarks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [reportPurchased, setReportPurchased] = useState(false);

  const updateCompany = (data) => {
    setCompany(prev => ({ ...prev, ...data }));
  };

  const addFinancialStatement = (statement) => {
    setFinancialStatements(prev => [...prev, statement]);
  };

  const addBenchmark = (benchmark) => {
    setBenchmarks(prev => [...prev, benchmark]);
  };

  const addRecommendation = (recommendation) => {
    setRecommendations(prev => [...prev, recommendation]);
  };

  const resetData = () => {
    setCompany({
      name: '',
      industry: '',
      revenue: '',
      expenses: '',
      assets: '',
      liabilities: ''
    });
    setFinancialStatements([]);
    setBenchmarks([]);
    setRecommendations([]);
    setAnalysisComplete(false);
    setReportPurchased(false);
  };

  const value = {
    company,
    financialStatements,
    benchmarks,
    recommendations,
    analysisComplete,
    reportPurchased,
    updateCompany,
    addFinancialStatement,
    addBenchmark,
    addRecommendation,
    setAnalysisComplete,
    setReportPurchased,
    resetData
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};