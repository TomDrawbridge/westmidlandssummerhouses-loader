import React from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';

const CustomHead = ({ mycodehere }) => {
  return (
<Head>
{parse(mycodehere)}
</Head>
  );
};

export default CustomHead;
