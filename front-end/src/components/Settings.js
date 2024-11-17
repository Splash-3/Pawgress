import React from 'react';
import { useEffect } from 'react';

const Settings = ({ data }) => {
  useEffect(() => {
    // This will run whenever data changes
    console.log('Data:', data);
  }, [data]);
  return (
    <div>
      <h2>Settings Component</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>    
    </div>
  );
};

export default Settings;