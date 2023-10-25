import React from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';

interface CustomHeadProps {
  mycodehere: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ mycodehere }) => {
  return (
    <Head>
      {parse(mycodehere)}
    </Head>
  );
};

export default CustomHead;
