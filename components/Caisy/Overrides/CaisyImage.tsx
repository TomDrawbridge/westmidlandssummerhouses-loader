import React from 'react';

const CaisyImage = ({ src, width, height, description }) => {
  console.log('CaisyImage src:', src);
  return <img loading="lazy" src={src} alt={description ?? ''} />;
};

export { CaisyImage };
