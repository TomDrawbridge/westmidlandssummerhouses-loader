import React, { useEffect, useState } from 'react';
import { RichTextRenderer } from '@caisy/rich-text-react-renderer';
import { Paragraph, Heading } from './Overrides/AllText';
import DocumentLink from './Overrides/DocumentLink'; 

interface CaisyRichTextProps {
  node: any; // Replace 'any' with the appropriate type of the 'node' prop
  themeResetClass: string; // Change 'string' to the appropriate type if needed
}

const CaisyRichText: React.FC<CaisyRichTextProps> = ({ node, themeResetClass }) => {
  const [content, setContent] = useState(null);

  const overrides = {
    paragraph: Paragraph,
    heading: Heading,
     documentLink: (props: DocumentLinkProps) => <DocumentLink {...props} connections={node?.connections} />
  };

  useEffect(() => {
    if (node) {
      const { json, connections } = node;
      const updatedContent = json.content.map((item) => {
        if (item.type === "documentLink") {
          const documentLink = connections.find((c) => c.id === item.attrs.documentId);
          if (documentLink) {
            return { ...item, attrs: { ...item.attrs, src: documentLink.src, documentId: documentLink.id } };
          }
        }
        return item;
      });
      setContent({ ...json, content: updatedContent });
    }
  }, [node]);

  return (
    <div className={themeResetClass}>
      {content ? <RichTextRenderer node={content} overwrites={overrides} /> : 'Loading...'}
    </div>
  );
};

export { CaisyRichText };
