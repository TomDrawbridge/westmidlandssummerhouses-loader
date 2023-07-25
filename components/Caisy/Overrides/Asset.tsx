// DocumentLink.js
import React from 'react';

const DocumentLink = ({ attrs }) => {
  return (
    <div style={{ backgroundColor: 'lightblue', padding: '10px', margin: '10px 0' }}>
      Document link with ID: {attrs.documentId}
    </div>
  );
};

export default DocumentLink;
