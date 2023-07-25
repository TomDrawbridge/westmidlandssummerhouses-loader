import React from 'react';

interface DocumentLinkProps {
  node: {
    attrs: {
      documentId: string;
      src: string;
      description?: string;
      dominantColor: string;
    };
  };
  connections?: Array<{
    id: string;
    src: string;
    // Add more connection properties if needed
  }>;
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ node, connections }) => {
  if (!node || !connections) return null;
  
  const { documentId, src, description, dominantColor } = node.attrs;
  const connection = connections.find((c) => c.id === documentId);
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

export { DocumentLink, DocumentLinkProps };
