import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const registerFunction = authContext.register;
  const navigate = useNavigate();

  // handle name change
  function handleNameChange(e) {
    console.log('name changed');
    setName(e.target.value);
  }

  // handle email change
  function handleEmailChange(e) {
    console.log('email changed');
    setEmail(e.target.value);
  }

  // handle password change
  function handlePasswordChange(e) {
    console.log('password changed');
    setPassword(e.target.value);
  }

  // handle confirm password change
  function handleConfirmPasswordChange(e) {
    console.log('confirm password changed');
    setConfirmPassword(e.target.value);
  }

  // handle form submit
  async function handleSubmit(e) {
    console.log('registration form submitted!');
    e.preventDefault();
    setLoading(true);
    setError('');

    // check if passwords match
    if (password !== confirmPassword) {
      console.log('passwords do not match');
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      console.log('calling register function');
      const result = await registerFunction(name, email, password);
      console.log('register successful');
      console.log(result);
      navigate('/program-landing');
    } catch (err) {
      console.log('register error: ' + err);
      let errorMessage = 'Registration failed';
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
              <h2 className="card-title mb-4 text-center">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
