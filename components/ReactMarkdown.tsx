import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReactMarkdownComponent = ({ source }) => {
  return <ReactMarkdown>{source}</ReactMarkdown> ;
};

export default ReactMarkdownComponent;