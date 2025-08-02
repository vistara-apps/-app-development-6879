import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "CEO, TechFlow Solutions",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "StrategyGPT identified $2.3M in cost savings we completely missed. The ROI analysis was spot-on and helped us secure additional funding.",
      rating: 5,
      revenue: "$12M ARR"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Founder, GreenTech Manufacturing",
      company: "GreenTech Manufacturing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The benchmarking insights were eye-opening. We implemented 4 of their 7 recommendations and saw 23% profit improvement in 6 months.",
      rating: 5,
      revenue: "$8.5M ARR"
    },
    {
      id: 3,
      name: "Jennifer Walsh",
      title: "CFO, Retail Dynamics",
      company: "Retail Dynamics",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Best $497 we've ever spent. The strategic roadmap helped us prioritize initiatives and avoid costly mistakes. McKinsey-quality at a fraction of the cost.",
      rating: 5,
      revenue: "$15M ARR"
    }
  ];

  return (
    <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gray-50)' }}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
            fontWeight: '700', 
            marginBottom: 'var(--space-lg)',
            fontFamily: 'Poppins, sans-serif',
            color: 'var(--gray-900)'
          }}>
            Trusted by 500+ SMB Leaders
          </h2>
          <p style={{ 
            color: 'var(--gray-600)', 
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            See how business leaders are using StrategyGPT to drive measurable growth and profitability.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--space-xl)',
          marginTop: 'var(--space-3xl)'
        }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card" style={{ 
              position: 'relative',
              padding: 'var(--space-2xl)',
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--gray-200)'
            }}>
              <div style={{ 
                position: 'absolute',
                top: 'var(--space-lg)',
                right: 'var(--space-lg)',
                color: 'var(--primary-200)',
                opacity: 0.3
              }}>
                <Quote size={32} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginRight: 'var(--space-md)',
                    objectFit: 'cover',
                    border: '3px solid var(--primary-100)'
                  }}
                />
                <div>
                  <h4 style={{ 
                    fontWeight: '600', 
                    marginBottom: '4px',
                    color: 'var(--gray-900)',
                    fontSize: '1.1rem'
                  }}>
                    {testimonial.name}
                  </h4>
                  <p style={{ 
                    color: 'var(--gray-600)', 
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    {testimonial.title}
                  </p>
                  <p style={{ 
                    color: 'var(--primary-600)', 
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {testimonial.company} • {testimonial.revenue}
                  </p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                marginBottom: 'var(--space-md)',
                gap: '2px'
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="var(--warning)" 
                    color="var(--warning)" 
                  />
                ))}
              </div>

              <p style={{ 
                color: 'var(--gray-700)', 
                lineHeight: '1.6',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                margin: 0
              }}>
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div style={{
          marginTop: 'var(--space-3xl)',
          textAlign: 'center',
          padding: 'var(--space-2xl)',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <p style={{ 
            color: 'var(--gray-600)', 
            marginBottom: 'var(--space-lg)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            TRUSTED & SECURE
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-2xl)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'var(--success)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ✓
              </div>
              <span style={{ color: 'var(--gray-700)', fontSize: '0.9rem' }}>
                256-bit SSL Encryption
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'var(--success)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ✓
              </div>
              <span style={{ color: 'var(--gray-700)', fontSize: '0.9rem' }}>
                GDPR Compliant
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'var(--success)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ✓
              </div>
              <span style={{ color: 'var(--gray-700)', fontSize: '0.9rem' }}>
                30-Day Money Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
