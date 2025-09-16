import { useLocation, useNavigate } from "react-router-dom";
import { PersonalizationForm, type PersonalizationData } from "@/components/PersonalizationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Personalize() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDietType = location.state?.selectedDietType;

  const handleSubmit = (data: PersonalizationData) => {
    // Calculate TDEE (Total Daily Energy Expenditure)
    const calculateTDEE = (data: PersonalizationData) => {
      const weight = parseFloat(data.weight);
      const height = parseFloat(data.height);
      const age = parseFloat(data.age);
      
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (data.gender === "male") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      // Apply activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extremely_active: 1.9
      };
      
      const tdee = bmr * activityMultipliers[data.activityLevel as keyof typeof activityMultipliers];
      
      // Adjust for fitness goal
      let targetCalories = tdee;
      if (data.fitnessGoal === "lose_weight") {
        targetCalories = tdee - 500; // 500 calorie deficit for 1lb/week loss
      } else if (data.fitnessGoal === "gain_muscle") {
        targetCalories = tdee + 300; // 300 calorie surplus for muscle gain
      }
      
      return Math.round(targetCalories);
    };

    const targetCalories = calculateTDEE(data);
    
    // Navigate to results with the form data and calculated calories
    navigate("/results", {
      state: {
        personalizationData: data,
        targetCalories: targetCalories
      }
    });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg"></div>
                <span className="text-xl font-bold text-foreground">NutriPlan</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <PersonalizationForm 
            onSubmit={handleSubmit}
            selectedDietType={selectedDietType}
          />
        </div>
      </main>
    </div>
  );
}