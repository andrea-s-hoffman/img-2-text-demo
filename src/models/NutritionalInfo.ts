export default interface NutritionalInfo {
  servingSize: string;
  amountPerServing: {
    calories: number;
    totalFatG: number;
    saturatedFatG: number;
    cholesterolMg: number;
    sodiumMg: number;
    carbsG: number;
    sugarsG: number;
    proteinG: number;
  };
}
