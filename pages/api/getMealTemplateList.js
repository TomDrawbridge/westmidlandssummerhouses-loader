// pages/api/getMealTemplateList.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch('https://api.trainerize.com/v03/dailyNutrition/getMealTemplateList', {
        method: 'POST', // The method is still POST for the external API call
        headers: {
          'Authorization': `Basic ${process.env.TRAINERIZE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: 0,
          count: 99,
          groupId: 260206,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        // Forward the status code from the Trainerize API to the client
        res.status(response.status).json({ message: 'Failed to fetch data from Trainerize API' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    // Handle any requests that aren't GET
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
