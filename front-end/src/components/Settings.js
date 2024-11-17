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

  const handleUpdateEmail = async () => {
    try {
      const response = await fetch(`http://localhost:6000/update-email/${data.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Email updated successfully.');
      } else {
        setMessage(result.error || 'Failed to update email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:6000/update-password/${data.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Password updated successfully.');
      } else {
        setMessage(result.error || 'Failed to update password.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:6000/delete-user/${data.userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('User and all their information deleted successfully.');
      } else {
        setMessage(result.error || 'Failed to delete user.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
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