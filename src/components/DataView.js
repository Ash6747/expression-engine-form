import React from 'react';

const JSONViewer = ({ jsonData }) => {
  return (
    <div>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default JSONViewer;
