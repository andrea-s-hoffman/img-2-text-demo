import NutritionalInfo from "../models/NutritionalInfo";
import { sampleData } from "./sampleData";

function nutritionParser(input: string): NutritionalInfo {
  const servingSizeMatch = input.match(
    /Serving Size\s+([^()]+)\s+\(([^)]+)\)/i
  );

  function getMatch(r: RegExp): number {
    const match = input.match(r);
    if (match) {
      if (!Number.isNaN(parseInt(match[1]))) {
        return parseInt(match[1]);
      }
    }
    return 0;
  }

  function extractValue(nutrient: string): number {
    const regex = new RegExp(`(?:${nutrient})\\s+([^g]+g)`, "i");
    return getMatch(regex);
  }

  function findCalories(): number {
    const regex = /calories\s+(\d+)/i;
    return getMatch(regex);
  }

  return {
    servingSize: servingSizeMatch
      ? `${servingSizeMatch[1].trim()} (${servingSizeMatch[2].trim()})`
      : "Not Found",
    amountPerServing: {
      calories: findCalories(),
      totalFatG: extractValue("Total Fat"),
      saturatedFatG: extractValue("Saturated Fat"),
      cholesterolMg: extractValue("Cholesterol"),
      sodiumMg: extractValue("Sodium"),
      carbsG: extractValue("Carbohydrate"),
      sugarsG: extractValue("Sugars"),
      proteinG: extractValue("Protein"),
    },
  };
}

console.log(nutritionParser(sampleData));

export default nutritionParser;
