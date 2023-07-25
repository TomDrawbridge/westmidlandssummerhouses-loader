import React, { FC } from "react";

const Paragraph = ({
  node,
  children,
classNameP
}) => {
  // Customize the rendering of paragraphs here
  return <p className={classNameP}>{children}</p>;
};

const Heading = ({ node, children, classNameH }) => {
  // Determine the heading level based on the `level` attribute
  const level = node.attrs?.level || 1;
  const HeadingTag = `h${level}`;

  // Customize the rendering of headings here
  return <HeadingTag className={`blog_h${level}`}>{children}</HeadingTag>;
};


export { Paragraph, Heading };