import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const ProgressIndicator = ({ currentStep = 1, steps = [] }) => {
  const defaultSteps = [
    { id: 1, title: 'Company Info', description: 'Basic business details' },
    { id: 2, title: 'Financial Data', description: 'Upload or enter financials' },
    { id: 3, title: 'Analysis', description: 'AI processing & benchmarking' },
    { id: 4, title: 'Strategy Report', description: 'Customized recommendations' }
  ];

  const progressSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <div style={{
      background: 'white',
      padding: 'var(--space-xl)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--gray-200)',
      marginBottom: 'var(--space-xl)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          height: '2px',
          background: 'var(--gray-200)',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%)',
            width: `${((currentStep - 1) / (progressSteps.length - 1)) * 100}%`,
            transition: 'width 0.5s ease',
            borderRadius: '1px'
          }} />
        </div>

        {progressSteps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              flex: 1,
              maxWidth: '200px'
            }}>
              {/* Step Circle */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-sm)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isCompleted 
                  ? 'linear-gradient(135deg, var(--success) 0%, var(--accent-emerald) 100%)'
                  : isCurrent 
                    ? 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)'
                    : 'white',
                border: isCompleted || isCurrent 
                  ? 'none' 
                  : '2px solid var(--gray-300)',
                boxShadow: isCompleted || isCurrent 
                  ? 'var(--shadow-md)' 
                  : 'var(--shadow-sm)',
                transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
              }}>
                {isCompleted ? (
                  <CheckCircle size={20} color="white" />
                ) : (
                  <span style={{
                    color: isCurrent ? 'white' : 'var(--gray-500)',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {step.id}
                  </span>
                )}
              </div>

              {/* Step Content */}
              <div style={{ textAlign: 'center' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '4px',
                  color: isCompleted || isCurrent ? 'var(--gray-900)' : 'var(--gray-500)',
                  transition: 'color 0.3s ease'
                }}>
                  {step.title}
                </h4>
                <p style={{
                  fontSize: '0.75rem',
                  color: isCompleted || isCurrent ? 'var(--gray-600)' : 'var(--gray-400)',
                  margin: 0,
                  lineHeight: 1.3,
                  transition: 'color 0.3s ease'
                }}>
                  {step.description}
                </p>
              </div>

              {/* Status Indicator */}
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '16px',
                  height: '16px',
                  background: 'var(--warning)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div style={{
        marginTop: 'var(--space-lg)',
        padding: 'var(--space-md)',
        background: 'var(--primary-50)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--primary-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'var(--primary-600)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
              {currentStep}
            </span>
          </div>
          <div>
            <p style={{ 
              margin: 0, 
              fontWeight: '600', 
              color: 'var(--primary-800)',
              fontSize: '0.9rem'
            }}>
              Step {currentStep} of {progressSteps.length}: {progressSteps[currentStep - 1]?.title}
            </p>
            <p style={{ 
              margin: 0, 
              color: 'var(--primary-700)', 
              fontSize: '0.8rem' 
            }}>
              {progressSteps[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressIndicator;
