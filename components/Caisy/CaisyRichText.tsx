import React from 'react';
import { RichTextRenderer } from '@caisy/rich-text-react-renderer';

// Asset Component
export const Asset = ({ src, description }) => {
  console.log("Rendering Asset", { src, description });  // Log the Asset props

  return (
    <>
      {src ? (
        <img
          loading="lazy"
          src={`${src}?w=1920&h=960`}
          srcSet={`${src}?w=3840&h=1920 1920w, ${src}?w=1920&h=960 1280w, ${src}?w=1280&h=640 640w`}
          alt={description ?? ""}
        />
      ) : (
        console.log("Asset src not defined", { src, description })  // Log a message if src is not defined
      )}
    </>
  );
};
// DocumentLink Component
export const DocumentLink = ({ connections, node, children }) => {
  console.log("Rendering DocumentLink", { connections, node });  // Log the DocumentLink props

  return (
    <>
      {connections?.map(
        (component) => {
          console.log('node.attrs.documentId:', node?.attrs?.documentId);
          console.log('component.id:', component.id);

          const shouldRenderAsset = node?.attrs?.documentId == component.id;
          console.log('shouldRenderAsset:', shouldRenderAsset);

          return shouldRenderAsset && <Asset key={component.id} {...component} />;
        }
      )}
      {children}
    </>
  );
};

// Main Component
export const CaisyRichText = ({className, themeResetClass, node, connections}) => {
  console.log("Rendering CaisyRichText", { node, connections });  // Log the CaisyRichText props

  return (
<div className={`${themeResetClass} ${className}`}>   
<RichTextRenderer
      node={node?.json}
      overwrites={{
        documentLink: (props) =>
          props?.node && connections ? (
            <DocumentLink node={props.node} connections={connections} />
          ) : null,
      }}
    />
</div>
  );
};

