# Simple Authentication System with Failure Injection

A project exploring how login systems work and testing what happens when things go wrong.

## Project Overview

This is a React-based login simulator that demonstrates basic authentication concepts like retry limits, account lockouts, and random error handling. It's frontend-only (not actually secure), built for learning purposes.

## Features

**Login Simulation**
- Email and password checking
- 3-attempt limit before lockout
- Password field clears after failed attempts
- Manual account recovery button

**Failure Injection Testing**
- Checkbox to enable random server errors (30% chance)
- See how systems behave when things fail
- Watch success rate drop when errors are injected

**Basic Metrics Tracking**
- Count total login attempts
- Track successful vs failed logins
- Calculate success rate percentage
- Record lockout and recovery timestamps

## How to Run

This is a React component. To use it in a Vite project:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Testing the System

Test account (hardcoded in the component):
- Email: student@college.edu
- Password: password123

Try these things:
1. Login with correct credentials
2. Enter wrong password 3 times to see the lockout
3. Click "Unlock Account" to reset
4. Check the "Enable failure injection" box and try logging in multiple times
5. Watch how the metrics change

## What I Learned

- Using React's useState hook to manage different pieces of state
- How to do functional state updates (the `setState(prev => prev + 1)` pattern)
- Working with JavaScript Date objects to record timestamps
- Basic conditional logic for authentication flows
- Simulating random errors with Math.random()
- Clearing form fields after failed attempts (better UX)

## Technologies Used

- React (JavaScript)
- Tailwind CSS (for styling)

## Concepts Demonstrated

- Basic authentication flow (checking credentials, tracking attempts)
- Simple lockout mechanism (frontend-only, not production-ready)
- Error simulation and handling
- Metrics tracking (attempts, success rate)
- Clean state management in React

## What This Isn't

This is not a secure authentication system. It's a learning project that:
- Has hardcoded credentials in the frontend
- Doesn't use a backend or database
- Can be bypassed by anyone who knows React DevTools
- Is purely for understanding concepts, not production use

## Possible Next Steps

- Add a backend API for real authentication
- Use a proper auth library like Auth0 or Firebase
- Add password hashing (currently plain text)
- Implement actual MFA (not just simulation)
- Add rate limiting on the backend
- Store lockout state in a database instead of component state

## Author

Varun Umapathy  
Freshman, Computer Science  
Nova Community College

This was built for my intro programming coursework to practice React state management and understand how login systems handle failures.