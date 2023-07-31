
import type { NextApiRequest, NextApiResponse } from 'next'


export async function getStaticProps() {
  const res = await fetch(process.env.CAISY_API_KEY);
  const data = await res.json();

  console.log(data); // Log the data to the console

  return { props: { data } };
}