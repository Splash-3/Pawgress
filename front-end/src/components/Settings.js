import React, { useState, useEffect } from 'react';

const Settings = ({ data }) => {
  const [email, setEmail] = useState(data.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This will run whenever data changes
    console.log('Data:', data);
    setEmail(data.email);
  }, [data]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdateEmail = () => {
    // Handle email update logic here
    console.log('Updated Email:', email);
    setMessage('Email updated successfully.');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    // Handle password reset logic here
    console.log('New Password:', newPassword);
    setMessage('Password reset successfully.');
  };

  const handleDeleteUser = () => {
    // Handle user deletion logic here
    console.log('User deleted');
    setMessage('User and all their information deleted successfully.');
  };

  return (
    <div>
      <h2>Settings Component</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>
        <h3>Update Email</h3>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter new email"
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      <div>
        <h3>Reset Password</h3>
        <input
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm new password"
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
      <div>
        <h3>Delete User</h3>
        <button onClick={handleDeleteUser} className="btn btn-danger">Delete User</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;