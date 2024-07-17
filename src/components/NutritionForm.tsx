import { FormEvent, useEffect, useState } from "react";
import NutritionalInfo from "../models/NutritionalInfo";

interface Props {
  nutrition: NutritionalInfo;
  dataFromDB: string;
  onComplete: (data: NutritionalInfo, foodName: string, back?: boolean) => void;
}

const NutritionForm = ({ nutrition, dataFromDB, onComplete }: Props) => {
  const [name, setName] = useState(dataFromDB);
  const [servingSize, setServingSize] = useState(nutrition.servingSize);
  const [calories, setCalories] = useState(
    `${nutrition.amountPerServing.calories}`
  );
  const [totalFat, setTotalFat] = useState(
    `${nutrition.amountPerServing.totalFatG}`
  );
  const [saturatedFat, setSaturatedFat] = useState(
    `${nutrition.amountPerServing.saturatedFatG}`
  );
  const [cholesterol, setCholesterol] = useState(
    `${nutrition.amountPerServing.cholesterolMg}`
  );
  const [sodium, setSodium] = useState(
    `${nutrition.amountPerServing.sodiumMg}`
  );
  const [carbs, setCarbs] = useState(`${nutrition.amountPerServing.carbsG}`);
  const [sugars, setSugars] = useState(`${nutrition.amountPerServing.sugarsG}`);
  const [protein, setProtein] = useState(
    `${nutrition.amountPerServing.proteinG}`
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (name && servingSize) {
      onComplete(nutrition, name);
    }
  };

  return (
    <form className="NutritionForm" onSubmit={submitHandler}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Per Serving - </p>
        <input
          type="text"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
      </div>
      <label htmlFor="calories">
        Calories (g):
        <input
          type="number"
          name="calories"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </label>
      <label htmlFor="totalFat">
        Total Fat (g):
        <input
          type="number"
          name="totalFat"
          id="totalFat"
          value={totalFat}
          onChange={(e) => setTotalFat(e.target.value)}
        />
      </label>
      <label htmlFor="saturatedFat">
        Saturated Fat (g):
        <input
          type="number"
          name="saturatedFat"
          id="saturatedFat"
          value={saturatedFat}
          onChange={(e) => setSaturatedFat(e.target.value)}
        />
      </label>
      <label htmlFor="cholesterol">
        Cholesterol (mg):
        <input
          type="number"
          name="cholesterol"
          id="cholesterol"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
        />
      </label>
      <label htmlFor="sodium">
        Sodium (mg):
        <input
          type="number"
          name="sodium"
          id="sodium"
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
        />
      </label>
      <label htmlFor="carbs">
        Carbohydrates (g):
        <input
          type="number"
          name="carbs"
          id="carbs"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />
      </label>
      <label htmlFor="sugars">
        Sugars (g):
        <input
          type="number"
          name="sugars"
          id="sugars"
          value={sugars}
          onChange={(e) => setSugars(e.target.value)}
        />
      </label>
      <label htmlFor="protein">
        Protein (g):
        <input
          type="number"
          name="protein"
          id="protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </label>
      <button disabled={name === ""}>Submit</button>
      <button type="button" onClick={() => onComplete(nutrition, name, true)}>
        Back
      </button>
    </form>
  );
};

export default NutritionForm;
