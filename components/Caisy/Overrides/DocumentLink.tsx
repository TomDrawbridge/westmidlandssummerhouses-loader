import React from 'react';

export interface DocumentLinkProps {
  node: {
    attrs: {
      documentId: string,
      src: string,
      description?: string,
      dominantColor?: string,
      [key: string]: any,
    },
    [key: string]: any,
  },
  connections: Array<{
    id: string,
    src: string,
    __typename: string,
    [key: string]: any,
  } | null>,
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ node, connections }) => {
  if (!node || !connections) return null;
  
  const { documentId, src, description, dominantColor } = node.attrs;
  const connection = connections.find((c) => c && c.id === documentId);
  const imageSrc = connection?.src || src;

  return (
    <img 
      style={{backgroundColor: dominantColor}}
      loading="lazy"
      src={`${imageSrc}?w=1100`}
      srcSet={`${imageSrc}?w=1100 1920w, 
              ${imageSrc}?w=640 1280w, 
              ${imageSrc}?w=640 640w, 
              ${imageSrc}?w=480 480w, 
              ${imageSrc}?w=320 320w`}
      alt={description ?? ''}
    />
  );
};

export default DocumentLink;
