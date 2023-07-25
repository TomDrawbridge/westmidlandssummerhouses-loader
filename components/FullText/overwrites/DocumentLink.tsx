import React from 'react';
import { Asset } from "./Asset"; // Ensure the path to your Asset component is correct.

interface IDocumentLink {
  children?: React.ReactNode;
  connections: any;
  node: any;
}

export const DocumentLink: React.FC<IDocumentLink> = ({ connections, node, children }) => {
  return (
    <>
      {connections?.map(
        (component) => 
          component?.__typename == "Asset" &&
          node?.attrs?.documentId == component.id && (
            <Asset 
              key={component.id} 
              src={component.src} 
              description={component.description} 
              dominantColor={component.dominantColor}
            />
          )
      )}
      {children}
    </>
  );
};
