import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const loginFunction = authContext.login;
  const navigate = useNavigate();

  // handle email change
  function handleEmailChange(e) {
    console.log('email changed: ' + e.target.value);
    setEmail(e.target.value);
  }

  // handle password change
  function handlePasswordChange(e) {
    console.log('password changed');
    setPassword(e.target.value);
  }

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    setLoading(true);
    setError('');
    
    try {
      console.log('calling login function');
      await loginFunction(email, password);
      console.log('login successful, navigating');
      navigate('/program-landing');
    } catch (err) {
      console.log('login error: ' + err);
      let errorMessage = 'Login failed';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-4 my-md-5 px-3 px-md-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body p-4">
              <h2 className="card-title mb-4 text-center">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
