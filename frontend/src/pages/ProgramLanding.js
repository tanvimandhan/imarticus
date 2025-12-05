import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgramLanding = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/program-landing');
  };

  const handleDownloadBrochure = () => {
    // Placeholder for download functionality
    alert('Brochure download feature coming soon!');
  };

  return (
    <div className="program-landing-page" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* White Header Bar with Logo */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '15px 10px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div className="container-fluid px-3 px-md-4">
          <div className="d-flex align-items-center flex-wrap">
            <div style={{
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontWeight: '700',
              letterSpacing: '0.5px',
              color: '#1a531a'
            }}>
              IMARTICUS LEARNING
            </div>
            <div style={{
              fontSize: 'clamp(10px, 3vw, 12px)',
              marginLeft: '10px',
              color: '#666666',
              fontWeight: '500'
            }}>
              12 YEARS
            </div>
          </div>
        </div>
      </div>

      {/* Dark Green Navigation Bar */}
      <div style={{
        backgroundColor: '#1a531a',
        color: '#ffffff',
        padding: '0'
      }}>
        <div className="container-fluid px-2 px-md-4" style={{ padding: '12px 0' }}>
          <nav style={{ 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            padding: '0 10px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }} className="program-nav">
            {['Overview', 'Hiring Partners', 'Curriculum', 'Trainers', 'Projects', 'Success stories', 'Pricing', 'FAQs'].map((item, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  fontWeight: index === 0 ? '600' : '400',
                  paddingBottom: '8px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  borderBottom: index === 0 ? '3px solid #FF6B35' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px 0', backgroundColor: '#ffffff' }} className="py-md-5">
        <div className="container px-3 px-md-4" style={{ maxWidth: '1200px' }}>
          {/* MyCaptain Logo */}
          <div className="text-center mb-4">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: 'clamp(30px, 8vw, 40px)',
                height: 'clamp(30px, 8vw, 40px)',
                backgroundColor: '#FF6B35',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(18px, 5vw, 24px)'
              }}>
                ✋
              </div>
              <div style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '700',
                color: '#FF6B35',
                letterSpacing: '-1px'
              }}>
                mycaptain
              </div>
            </div>
            <div style={{
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              color: '#333333',
              fontWeight: '500',
              letterSpacing: '1px'
            }}>
              BY IMARTICUS LEARNING
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-3">
            <h1 style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#000000',
              marginBottom: '15px',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              padding: '0 10px'
            }}>
              Become a Digital Marketer in 18 Weeks
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#333333',
              fontWeight: '400',
              marginBottom: '40px',
              padding: '0 10px'
            }}>
              MyCaptain Digital Marketing Program with Job Assurance
            </p>
          </div>

          {/* Program Details Card */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef'
              }} className="p-md-4 p-lg-5">
                <div className="row mb-4">
                  <div className="col-12 col-md-6 mb-3">
                    <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#666666', marginBottom: '8px' }}>
                      Next Batch
                    </div>
                    <div style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '600', color: '#000000' }}>
                      October
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#666666', marginBottom: '8px' }}>
                      Available Seats
                    </div>
                    <div style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '600', color: '#000000' }}>
                      29/60
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-6 mb-3">
                    <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#666666', marginBottom: '8px' }}>
                      Taught by experts from
                    </div>
                    <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: '500', color: '#000000' }}>
                      Rapido, Deloitte, MFine, Zomato
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#666666', marginBottom: '8px' }}>
                      Designed for
                    </div>
                    <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: '500', color: '#000000' }}>
                      Freshers & Early Working Professionals
                    </div>
                  </div>
                </div>

                {/* Rating and Learners */}
                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid #e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px', color: '#FFD700' }}>⭐</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>4.51</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>👤</span>
                    <span style={{ fontSize: '16px', fontWeight: '500', color: '#000000' }}>1.2 Lacs+ Learners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="text-center">
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }} className="px-3">
              <button
                onClick={handleApplyNow}
                style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                  letterSpacing: '0.3px',
                  minWidth: '200px',
                  width: '100%',
                  maxWidth: '280px',
                  minHeight: '50px'
                }}
                className="btn-responsive"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e55a2b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF6B35';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                }}
              >
                Apply Now
              </button>
              <button
                onClick={handleDownloadBrochure}
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(26, 26, 26, 0.3)',
                  letterSpacing: '0.3px',
                  minWidth: '200px',
                  width: '100%',
                  maxWidth: '280px',
                  minHeight: '50px'
                }}
                className="btn-responsive"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 26, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(26, 26, 26, 0.3)';
                }}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights and Application Form Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '600px',
        marginTop: '30px'
      }} className="flex-md-row mt-md-5">
        {/* Left Section - Dark Green Background */}
        <div style={{
          flex: '1.5',
          backgroundColor: '#1a531a',
          color: '#ffffff',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }} className="p-md-4 p-lg-5">
          {/* Key Highlights */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '30px'
            }} className="mb-md-4">
              Key Highlights
            </h2>
            <div className="row g-3 mb-4 mb-md-5">
              <div className="col-6 col-md-6">
                <div style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  padding: '25px 20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
                    1600+
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                    Students Placed
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  padding: '25px 20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
                    12LPA
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                    Highest CTC
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  padding: '25px 20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
                    10
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                    Assured Interviews
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  padding: '25px 20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
                    1000+
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                    Hiring partners
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration Section */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                fontSize: '1rem',
                color: '#ffffff',
                marginBottom: '20px',
                opacity: 0.9
              }}>
                The Program has been created in collaboration with Managers from
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                {['zomato', 'rapido', 'mfine', 'Deloitte'].map((company, index) => (
                  <div key={index} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '15px 25px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - White Background with Application Form */}
        <div style={{
          flex: '0.8',
          backgroundColor: '#ffffff',
          padding: '30px 20px',
          borderLeft: 'none',
          borderTop: '1px solid #e9ecef',
          maxWidth: '100%'
        }} className="p-md-4 p-lg-5 border-md-left border-md-top-none">
          <h2 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.8rem)',
            fontWeight: '700',
            marginBottom: '30px',
            lineHeight: '1.3',
            color: '#000000'
          }}>
            <span style={{ color: '#000000' }}>Apply For The </span>
            <span style={{ color: '#FF6B35' }}>MyCaptain Digital Marketing Job Assurance Program</span>
          </h2>

          <form>
            <div className="mb-4">
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#333333'
              }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                style={{
                  padding: '12px 15px',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ced4da',
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
              />
            </div>

            <div className="mb-4">
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#333333'
              }}>
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                style={{
                  padding: '12px 15px',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ced4da',
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
              />
            </div>

            <div className="mb-4">
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#333333'
              }}>
                Mobile Number
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <select
                  className="form-select"
                  style={{
                    width: '100%',
                    minWidth: '150px',
                    maxWidth: '200px',
                    padding: '12px 15px',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                >
                  <option>India (+91)</option>
                  <option>USA (+1)</option>
                  <option>UK (+44)</option>
                </select>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter mobile number"
                  style={{
                    flex: '1',
                    minWidth: '200px',
                    padding: '12px 15px',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#333333'
              }}>
                Location
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select location"
                  style={{
                    padding: '12px 15px',
                    paddingRight: '40px',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666666'
                }}>
                  ▼
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#333333'
              }}>
                Professional Experience
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select experience"
                  style={{
                    padding: '12px 15px',
                    paddingRight: '40px',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666666'
                }}>
                  ▼
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={handleDownloadBrochure}
                style={{
                  flex: '1',
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Download Brochure
              </button>
              <button
                type="submit"
                style={{
                  flex: '1',
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e55a2b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF6B35';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Program Curriculum Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '40px 0',
        minHeight: '600px'
      }} className="py-md-5">
        <div className="container px-3 px-md-4" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-4 mb-md-5">
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#333333',
              marginBottom: '15px'
            }}>
              Program Curriculum
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              color: '#666666',
              marginBottom: '40px'
            }}>
              Our curriculum is designed to make you a finest marketer
            </p>
          </div>

          {/* Curriculum Modules */}
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { title: 'Welcome to the Digital Marketing Pro Course', classes: '', projects: '', collapsed: true },
              { title: 'Fundamentals of Digital Marketing', classes: '6 Live Classes', projects: '1 Project' },
              { title: 'Social Media Marketing', classes: '10 Live Classes', projects: '3 Project' },
              { title: 'Search Engine Optimisation', classes: '9 Live Classes', projects: '2 Project' },
              { title: 'Performance Marketing', classes: '20 Live Classes', projects: '6 Project' }
            ].map((module, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '15px 20px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
                className="p-md-3"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#FF6B35';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <div style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                    fontWeight: '600',
                    color: '#333333',
                    marginBottom: module.classes ? '8px' : '0'
                  }}>
                    {module.title}
                  </div>
                  {module.classes && (
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                      color: '#666666',
                      marginTop: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span>{module.classes}</span>
                      <span>{module.projects}</span>
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  color: '#666666',
                  marginLeft: '10px'
                }}>
                  ▼
                </div>
              </div>
            ))}
          </div>

          {/* Download Buttons */}
          <div className="text-center mt-4 mt-md-5">
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }} className="px-3">
              <button
                style={{
                  backgroundColor: '#FF6B35',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 30px',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  maxWidth: '280px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e55a2b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF6B35';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>⬇</span> Download Curriculum
              </button>
              <button
                onClick={handleDownloadBrochure}
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 30px',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  maxWidth: '280px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>⬇</span> Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#1a531a',
        color: '#ffffff',
        padding: '40px 0 30px',
        width: '100%'
      }} className="py-md-5">
        <div className="container px-3 px-md-4">
          <div className="row mb-4">
            {/* Left Side - Social Media */}
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h5 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Follow us on
              </h5>
              <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
              }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                >
                  f
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                >
                  X
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                >
                  in
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                >
                  📷
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '18px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                >
                  ▶
                </a>
              </div>
            </div>

            {/* Right Side - App Download */}
            <div className="col-12 col-md-6 text-md-end">
              <h5 style={{
                fontSize: 'clamp(1rem, 3vw, 1.1rem)',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Download our app
              </h5>
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'flex-start',
                flexWrap: 'wrap'
              }} className="justify-content-md-end">
                <button
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  GET IT ON Google Play
                </button>
                <button
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Download on the App Store
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '30px',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ffffff'
            }}>
              IMARTICUS LEARNING
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#ffffff',
              opacity: 0.9
            }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{
                color: '#ffffff',
                textDecoration: 'none',
                marginRight: '10px'
              }}>
                Terms & Conditions
              </a>
              |
              <a href="#" onClick={(e) => e.preventDefault()} style={{
                color: '#ffffff',
                textDecoration: 'none',
                marginLeft: '10px'
              }}>
                Privacy Policy
              </a>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '0.85rem',
            color: '#ffffff',
            opacity: 0.8
          }}>
            © 2025 Imarticus Learning Pvt. Ltd. All rights reserved.
          </div>
        </div>

        {/* Floating Download Brochure Button */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
          width: '90%',
          maxWidth: '300px'
        }} className="d-none d-md-block">
          <button
            onClick={handleDownloadBrochure}
            style={{
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              border: 'none',
              padding: '14px 30px',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramLanding;
