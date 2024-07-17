import NutritionalInfo from "../models/NutritionalInfo";

interface Props {
  dataFromDB: string;
  nutrition: NutritionalInfo;
  onComplete: (back?: boolean) => void;
}

const Confirmation = ({ dataFromDB, nutrition, onComplete }: Props) => {
  return (
    <div className="Confirmation">
      <h2>{dataFromDB}</h2>
      <h3>Serving Size: {nutrition.servingSize}</h3>
      <p>Calories: {nutrition.amountPerServing.calories}</p>
      <p>Protein: {nutrition.amountPerServing.proteinG}g</p>
      <p>Carbs: {nutrition.amountPerServing.carbsG}g</p>
      <p>Total Fat: {nutrition.amountPerServing.totalFatG}g</p>
      <p> - Saturated Fat: {nutrition.amountPerServing.saturatedFatG}g</p>
      <p>Cholesterol: {nutrition.amountPerServing.cholesterolMg}mg</p>
      <p>Sugar: {nutrition.amountPerServing.sugarsG}g</p>
      <p>Sodium: {nutrition.amountPerServing.sugarsG}mg</p>
      <button onClick={() => onComplete()}>Submit Another</button>
      <button onClick={() => onComplete(true)}>Back</button>
    </div>
  );
};

export default Confirmation;
