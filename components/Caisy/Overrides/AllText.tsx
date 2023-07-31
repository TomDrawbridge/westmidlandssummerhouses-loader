import React, { FC, ReactNode } from "react";

interface ParagraphProps {
  node: any;
  children: ReactNode;
}

const Paragraph: FC<ParagraphProps> = ({ node, children }) => {
  // Customize the rendering of paragraphs here
  return <p>{children}</p>;
};

interface HeadingProps {
  node: {
    attrs?: {
      level?: number;
    }
  };
  children: ReactNode;
}

const Heading: FC<HeadingProps> = ({ node, children }) => {
  // Determine the heading level based on the `level` attribute
  const level = node.attrs?.level || 1;
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  // Customize the rendering of headings here
  return <HeadingTag>{children}</HeadingTag>;
};

export { Paragraph, Heading };
