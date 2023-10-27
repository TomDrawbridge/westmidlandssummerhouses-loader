import React from 'react';
import Head from 'next/head'; // Import the Next.js Head component

const JsonLd = ({ children }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
      />
    </Head>
  );
};

export default JsonLd;

interface schema_articleProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: string[];
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherLogoUrl: string;
}

const schema_article: React.FC<schema_articleProps> = ({
  headline,
  description,
  datePublished,
  dateModified,
  image,
  authorName,
  authorUrl,
  publisherName,
  publisherLogoUrl,
}) => {
  return (
    <JsonLd>
      {{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        datePublished,
        dateModified,
        image,
        author: [
          {
            "@type": "Person",
            name: authorName,
            url: authorUrl,
          },
        ],
        publisher: {
          "@type": "Organization",
          name: publisherName,
          logo: {
            "@type": "ImageObject",
            url: publisherLogoUrl,
          },
        },
      }}
    </JsonLd>
  );
};

export default schema_article;
