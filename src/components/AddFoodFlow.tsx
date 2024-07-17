import { useState } from "react";
import ImageUploader from "./ImageUploader";
import NutritionForm from "./NutritionForm";
import NutritionalInfo from "../models/NutritionalInfo";
import Confirmation from "./Confirmation";

const DUMMY_NUTRITION: NutritionalInfo = {
  servingSize: "",
  amountPerServing: {
    calories: 0,
    totalFatG: 0,
    saturatedFatG: 0,
    cholesterolMg: 0,
    sodiumMg: 0,
    carbsG: 0,
    sugarsG: 0,
    proteinG: 0,
  },
};

const AddFoodFlow = () => {
  const [step, setStep] = useState(0);
  const [nutrition, setNutrition] = useState<NutritionalInfo>(DUMMY_NUTRITION);
  const [dataFromDB, setDataFromDB] = useState("");

  const step1Complete = (data: NutritionalInfo) => {
    setNutrition(data);
    setStep(1);
  };

  const step2Complete = (
    data: NutritionalInfo,
    foodName: string,
    back: boolean = false
  ) => {
    setDataFromDB(foodName);
    setNutrition(data);
    setStep(back ? 0 : 2);
  };

  const step3Complete = (back: boolean = false) => {
    if (back) {
      setStep(1);
    } else {
      setDataFromDB("");
      setNutrition(DUMMY_NUTRITION);
      setStep(0);
    }
  };
  return (
    <div className="AddFoodFlow">
      {step === 0 && <ImageUploader onComplete={step1Complete} />}
      {step === 1 && (
        <NutritionForm
          nutrition={nutrition}
          onComplete={step2Complete}
          dataFromDB={dataFromDB}
        />
      )}
      {step === 2 && (
        <Confirmation
          nutrition={nutrition}
          onComplete={step3Complete}
          dataFromDB={dataFromDB}
        />
      )}
    </div>
  );
};

export default AddFoodFlow;
