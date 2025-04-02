import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrashGame from '../CrashGame/Crash';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // If no user is found in localStorage, redirect to the sign-up page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000); // 1 second delay for a smoother transition
    } else {
      // If user exists, set loading to false after the check
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking login status
  }

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      <p>You are logged in successfully!</p>
      {<CrashGame/>}
    </div>
  );
};

export default Dashboard;
