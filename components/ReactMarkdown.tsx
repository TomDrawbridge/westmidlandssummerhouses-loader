import * as React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  source: string;
}

const ReactMarkdownComponent: React.FC<Props> = ({ source }: Props) => {
  return <ReactMarkdown>{source}</ReactMarkdown>;
};

export default ReactMarkdownComponent;