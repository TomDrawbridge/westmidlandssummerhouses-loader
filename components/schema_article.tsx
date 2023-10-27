import React from 'react';
import Head from 'next/head';

interface BlogPostingProps {
  headline: string;
  image: string;
  authorType: string; 
  authorName: string;
  publisherName: string;
  publisherLogoUrl: string;
  datePublished: string;
}

const BlogPosting: React.FC<BlogPostingProps> = ({
  headline,
  image,
  authorType,
  authorName,
  publisherName,
  publisherLogoUrl,
  datePublished
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "image": image,  
    "author": {
      "@type": authorType,
      "name": authorName
    },  
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogoUrl
      }
    },
    "datePublished": datePublished
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default BlogPosting;
