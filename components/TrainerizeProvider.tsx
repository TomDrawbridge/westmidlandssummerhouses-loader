import React, { ReactNode, useEffect, useState } from "react";
import { DataProvider } from "@plasmicapp/loader-nextjs";

export interface TrainerizeContextValue {
  mealTemplateList: any[]; // Adjust the type according to the expected data structure
}

export const TrainerizeContext = React.createContext<TrainerizeContextValue>({
  mealTemplateList: [],
});

export function TrainerizeProvider({ children }: { children: React.ReactNode }) {
  console.log('TrainerizeProvider is running');
  const [mealTemplateList, setMealTemplateList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetching from the local API route instead of the external API
      const response = await fetch('/api/getMealTemplateList');

      if (response.ok) {
        const data = await response.json();
        setMealTemplateList(data); // Adjust based on the actual structure of the response
      } else {
        console.error('Failed to fetch meal template list');
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <DataProvider name={"mealTemplateList"} data={mealTemplateList}>
      {children}
    </DataProvider>
  );
}

