import React, { useState, createContext } from 'react';
import { usePlasmicQueryData, DataProvider } from '@plasmicapp/loader-nextjs';

// Define the shape of the data using TypeScript interface
export interface TrainerizeData {
  // replace with the actual shape of your data
  programs: any[];
}

// Create a context for the Trainerize data
export const TrainerizeContext = createContext<TrainerizeData | null>(null);

export function TrainerizeProvider({ children }: { children: React.ReactNode }) {
  const { data } = usePlasmicQueryData('/getList', async () => {
    const response = await fetch("/api/v03/program/getList", {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ type: 'all' }),
    });
    if (!response.ok) {
      // handle errors
      console.error("API request failed", await response.text());
      return null;
    }
    return await response.json();
  });

  // You can manage the state here if needed, or just pass the data directly
  const [trainerizeData, setTrainerizeData] = useState<TrainerizeData | null>(data);

  return (
    <TrainerizeContext.Provider value={trainerizeData}>
      {data && (
        <DataProvider name="Trainerize" data={data}>
          {children}
        </DataProvider>
      )}
    </TrainerizeContext.Provider>
  );
}
