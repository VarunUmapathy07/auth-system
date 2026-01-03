import React, { useState } from 'react';

export default function SimpleAuthSystem() {
  const CORRECT_EMAIL = 'student@college.edu';
  const CORRECT_PASSWORD = 'password123';
  const MAX_ATTEMPTS = 3;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  
  const [totalTries, setTotalTries] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  
  const [failureMode, setFailureMode] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [recoveryTime, setRecoveryTime] = useState(null);

  const handleLogin = () => {
    if (isLocked) {
      setMessage('Account is locked! Click "Unlock Account" to try again.');
      return;
    }

    setTotalTries(t => t + 1);
    
    // Failure injection: 30% chance of random server error
    if (failureMode && Math.random() < 0.3) {
      setMessage('Server error! Please try again.');
      setFailCount(f => f + 1);
      return;
    }

    if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setSuccessCount(s => s + 1);
      setMessage('Login successful! Welcome!');
      setAttempts(0);
      
      // Record recovery time if we were previously locked
      if (lockoutTime) {
        setRecoveryTime(new Date());
        setLockoutTime(null);
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setFailCount(f => f + 1);
      setPassword('');
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(new Date()); // Record when we got locked
        setMessage('Account locked! Too many failed attempts.');
      } else {
        setMessage(`Wrong credentials! ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setAttempts(0);
    setMessage('Account unlocked. You can try again!');
    
    // Record recovery time, then clear lockout time
    if (lockoutTime) {
      setRecoveryTime(new Date());
      setLockoutTime(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setAttempts(0);
    setIsLocked(false);
    setIsLoggedIn(false);
    setMessage('');
    setTotalTries(0);
    setSuccessCount(0);
    setFailCount(0);
    setLockoutTime(null);
    setRecoveryTime(null);
  };
  
  // Helper function to calculate time difference in seconds
  const getTimeDifference = (start, end) => {
    if (!start || !end) return null;
    const diff = (end - start) / 1000; // Convert to seconds
    return diff.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Simple Login System</h1>
        
        <div className="bg-white border border-gray-300 rounded p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Login</h2>

          {message && (
            <div className={`mb-4 p-3 border rounded ${
              isLoggedIn ? 'bg-green-50 border-green-300 text-green-800' : 
              isLocked ? 'bg-red-50 border-red-300 text-red-800' : 
              'bg-yellow-50 border-yellow-300 text-yellow-800'
            }`}>
              {message}
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Failed attempts: {attempts} / {MAX_ATTEMPTS}
            </p>
          </div>

          {!isLoggedIn ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLocked}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLocked}
                  onKeyDown={(e) => e.key === 'Enter' && !isLocked && handleLogin()}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={isLocked}
                className={`w-full py-2 rounded ${
                  isLocked 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Login
              </button>

              {isLocked && (
                <button
                  onClick={handleUnlock}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Unlock Account
                </button>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Test Account:</p>
                <p className="text-xs text-gray-600">Email: student@college.edu</p>
                <p className="text-xs text-gray-600">Password: password123</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 mt-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={failureMode}
                    onChange={(e) => setFailureMode(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Enable failure injection (30% error rate)</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-green-700 font-medium">You are logged in as {email}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-300 rounded p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Metrics</h2>
            <button
              onClick={handleReset}
              className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-700">Total attempts: {totalTries}</p>
            <p className="text-gray-700">Successful logins: {successCount}</p>
            <p className="text-gray-700">Failed attempts: {failCount}</p>
            <p className="text-gray-700">
              Success rate: {totalTries ? ((successCount / totalTries) * 100).toFixed(1) : 0}%
            </p>
            
            {lockoutTime && (
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-red-600 font-medium">🔒 Currently locked</p>
                <p className="text-gray-600 text-xs">Locked at: {lockoutTime.toLocaleTimeString()}</p>
              </div>
            )}
            
            {!lockoutTime && recoveryTime && (
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-green-600 font-medium">✓ Last recovery</p>
                <p className="text-gray-600 text-xs">Recovered at: {recoveryTime.toLocaleTimeString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}