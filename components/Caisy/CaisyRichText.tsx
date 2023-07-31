import React from 'react';
import { RichTextRenderer } from '@caisy/rich-text-react-renderer';

// Asset Component
interface AssetProps {
  src?: string;
  description?: string | null;
}

export const Asset: React.FC<AssetProps> = ({ src, description }) => {
  console.log("Rendering Asset", { src, description });

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
        console.log("Asset src not defined", { src, description })
      )}
    </>
  );
};

// DocumentLink Component
interface DocumentLinkProps {
  connections?: {
    id: string;
    // Define other properties of the 'component' object here
  }[];
  node: {
    attrs?: {
      documentId?: string;
      // Define other properties of the 'attrs' object here
    };
    json: any; // You can use a specific type for the 'json' property if available
    // Define other properties of the 'node' object here
  };
}

export const DocumentLink: React.FC<DocumentLinkProps> = ({ connections, node }) => {
  console.log("Rendering DocumentLink", { connections, node });

  return (
    <>
      {connections?.map((component) => {
        console.log('node.attrs.documentId:', node?.attrs?.documentId);
        console.log('component.id:', component.id);

        const shouldRenderAsset = node?.attrs?.documentId === component.id;
        console.log('shouldRenderAsset:', shouldRenderAsset);

        return shouldRenderAsset && <Asset key={component.id} {...component} />;
      })}
    </>
  );
};

// Main Component
interface CaisyRichTextProps {
  className: string;
  themeResetClass: string;
  node: {
    json?: any; // You can use a specific type for the 'json' property if available
    // Define other properties of the 'node' object here
  };
  connections?: DocumentLinkProps['connections'];
}

export const CaisyRichText: React.FC<CaisyRichTextProps> = ({ className, themeResetClass, node, connections }) => {
  console.log("Rendering CaisyRichText", { node, connections });

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
