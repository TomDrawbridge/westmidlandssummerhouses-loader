import React, { useEffect, useState, FC, ReactNode } from 'react';
import { RichTextRenderer } from '@caisy/rich-text-react-renderer';
import { Paragraph, Heading } from './Overrides/AllText';
import DocumentLink, { DocumentLinkProps } from './Overrides/DocumentLink';


interface Node {
  json: {
    content: Array<{
      type: string,
      attrs: {
        documentId: string,
        [key: string]: any,
      },
      [key: string]: any,
    }>,
    [key: string]: any,
  },
  connections: Array<{
    id: string,
    src: string,
    [key: string]: any,
  }>,
  [key: string]: any,
}

interface CaisyRichTextProps {
  node: Node;
  themeResetClass: string;
}

interface Content {
  json: {
    content: Array<{
      type: string,
      attrs: {
        documentId: string,
        [key: string]: any,
      },
      [key: string]: any,
    }>,
    [key: string]: any,
  },
  [key: string]: any,
}


const CaisyRichText: React.FC<CaisyRichTextProps> = ({ node, themeResetClass }) => {
  const [content, setContent] = useState<Content | null>(null);

const overrides = {
  paragraph: ({ node, children }: { node: any, children?: ReactNode }) => <Paragraph node={node}>{children}</Paragraph>,
  heading: ({ node, children }: { node: any, children?: ReactNode }) => <Heading node={node}>{children}</Heading>,
  documentLink: (node: any) => <DocumentLink node={node} connections={node?.connections} />
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
      setContent({ json: { ...json, content: updatedContent } });
    }
  }, [node]);

  return (
    <div className={themeResetClass}>
      {content ? <RichTextRenderer node={content.json} overwrites={overrides} /> : 'Loading...'}
    </div>
  );
};

export { CaisyRichText };
