import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MealPlanCard } from "@/components/MealPlanCard";
import { RecipeModal } from "@/components/RecipeModal";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Loader2, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface MealPlan {
  id: string;
  title: string;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: {
    breakfast: Recipe;
    lunch: Recipe;
    dinner: Recipe;
    snack?: Recipe;
  };
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { personalizationData, targetCalories } = location.state || {};
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock meal plans for demonstration (in real app, this would come from Spoonacular API)
  const generateMockMealPlans = (): MealPlan[] => {
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        title: "Avocado Toast with Poached Egg",
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
        readyInMinutes: 15,
        servings: 1,
        calories: 320,
        protein: 14,
        carbs: 25,
        fat: 18
      },
      {
        id: 2,
        title: "Grilled Chicken Salad Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        readyInMinutes: 25,
        servings: 1,
        calories: 380,
        protein: 35,
        carbs: 15,
        fat: 22
      },
      {
        id: 3,
        title: "Salmon with Quinoa & Vegetables",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        readyInMinutes: 30,
        servings: 1,
        calories: 450,
        protein: 32,
        carbs: 35,
        fat: 20
      },
      {
        id: 4,
        title: "Greek Yogurt with Berries",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
        readyInMinutes: 5,
        servings: 1,
        calories: 180,
        protein: 15,
        carbs: 20,
        fat: 6
      },
      {
        id: 5,
        title: "Vegetable Stir Fry with Tofu",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        readyInMinutes: 20,
        servings: 1,
        calories: 340,
        protein: 18,
        carbs: 28,
        fat: 16
      },
      {
        id: 6,
        title: "Protein Smoothie Bowl",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
        readyInMinutes: 10,
        servings: 1,
        calories: 280,
        protein: 20,
        carbs: 32,
        fat: 8
      }
    ];

    const plans: MealPlan[] = [
      {
        id: "plan1",
        title: "Balanced Nutrition Plan",
        totalCalories: targetCalories || 1800,
        macros: { protein: 120, carbs: 180, fat: 60 },
        meals: {
          breakfast: mockRecipes[0],
          lunch: mockRecipes[1],
          dinner: mockRecipes[2],
          snack: mockRecipes[3]
        }
      },
      {
        id: "plan2",
        title: "High Protein Focus",
        totalCalories: (targetCalories || 1800) + 100,
        macros: { protein: 140, carbs: 160, fat: 65 },
        meals: {
          breakfast: mockRecipes[5],
          lunch: mockRecipes[1],
          dinner: mockRecipes[2],
          snack: mockRecipes[3]
        }
      },
      {
        id: "plan3",
        title: "Plant-Based Option",
        totalCalories: (targetCalories || 1800) - 50,
        macros: { protein: 100, carbs: 200, fat: 55 },
        meals: {
          breakfast: mockRecipes[5],
          lunch: mockRecipes[4],
          dinner: mockRecipes[4],
          snack: mockRecipes[3]
        }
      }
    ];

    return plans;
  };

  useEffect(() => {
    if (!personalizationData) {
      navigate("/personalize");
      return;
    }

    // Simulate API call
    const fetchMealPlans = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const plans = generateMockMealPlans();
        setMealPlans(plans);
        
        toast({
          title: "Meal plans generated!",
          description: `Found ${plans.length} personalized meal plans for you.`,
        });
      } catch (err) {
        setError("Failed to generate meal plans. Please try again.");
        toast({
          title: "Error",
          description: "Failed to generate meal plans. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlans();
  }, [personalizationData, navigate, targetCalories, toast]);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handlePrintPlan = (planId: string) => {
    const plan = mealPlans.find(p => p.id === planId);
    if (!plan) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate print content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>NutriPlan - ${plan.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            h1 { color: #2c5234; border-bottom: 2px solid #2c5234; padding-bottom: 10px; }
            h2 { color: #4a7c59; margin-top: 30px; }
            .header { text-align: center; margin-bottom: 40px; }
            .calories { font-size: 18px; font-weight: bold; color: #2c5234; }
            .macros { display: flex; justify-content: space-around; margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px; }
            .macro { text-align: center; }
            .meal { margin: 20px 0; padding: 15px; border-left: 4px solid #4a7c59; }
            .meal-title { font-weight: bold; color: #2c5234; margin-bottom: 5px; }
            .meal-info { font-size: 14px; color: #666; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NutriPlan - ${plan.title}</h1>
            <div class="calories">${plan.totalCalories} calories per day</div>
          </div>
          
          <h2>Daily Macronutrients</h2>
          <div class="macros">
            <div class="macro">
              <div style="font-size: 20px; font-weight: bold;">${plan.macros.protein}g</div>
              <div>Protein</div>
            </div>
            <div class="macro">
              <div style="font-size: 20px; font-weight: bold;">${plan.macros.carbs}g</div>
              <div>Carbohydrates</div>
            </div>
            <div class="macro">
              <div style="font-size: 20px; font-weight: bold;">${plan.macros.fat}g</div>
              <div>Fat</div>
            </div>
          </div>

          <h2>Daily Meal Plan</h2>
          
          <div class="meal">
            <div class="meal-title">🌅 Breakfast: ${plan.meals.breakfast.title}</div>
            <div class="meal-info">Prep time: ${plan.meals.breakfast.readyInMinutes} minutes | Serves: ${plan.meals.breakfast.servings}</div>
          </div>

          <div class="meal">
            <div class="meal-title">☀️ Lunch: ${plan.meals.lunch.title}</div>
            <div class="meal-info">Prep time: ${plan.meals.lunch.readyInMinutes} minutes | Serves: ${plan.meals.lunch.servings}</div>
          </div>

          <div class="meal">
            <div class="meal-title">🌙 Dinner: ${plan.meals.dinner.title}</div>
            <div class="meal-info">Prep time: ${plan.meals.dinner.readyInMinutes} minutes | Serves: ${plan.meals.dinner.servings}</div>
          </div>

          ${plan.meals.snack ? `
          <div class="meal">
            <div class="meal-title">🍎 Snack: ${plan.meals.snack.title}</div>
            <div class="meal-info">Prep time: ${plan.meals.snack.readyInMinutes} minutes | Serves: ${plan.meals.snack.servings}</div>
          </div>
          ` : ''}

          <div class="footer">
            <p>Generated by NutriPlan - Your Personalized Diet Planning App</p>
            <p>Printed on: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();

    toast({
      title: "Plan ready to print!",
      description: "Your meal plan has been formatted for printing.",
    });
  };

  const handleGoBack = () => {
    navigate("/personalize");
  };

  const handleRefresh = () => {
    const plans = generateMockMealPlans();
    setMealPlans(plans);
    toast({
      title: "Plans refreshed!",
      description: "Generated new meal plan variations for you.",
    });
  };

  if (!personalizationData) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
            {!isLoading && (
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Plans
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Your Personalized Meal Plans
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Based on your preferences, we've created {isLoading ? "..." : mealPlans.length} custom meal plans
            </p>
            
            {/* User Info Summary */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="px-4 py-2">
                Target: {targetCalories} calories
              </Badge>
              <Badge variant="outline" className="px-4 py-2 capitalize">
                {personalizationData.dietType.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2 capitalize">
                {personalizationData.fitnessGoal.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2 capitalize">
                {personalizationData.activityLevel.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Generating Your Meal Plans...
              </h3>
              <p className="text-muted-foreground">
                Analyzing your preferences and calculating optimal nutrition
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={handleRefresh}>
                Try Again
              </Button>
            </div>
          )}

          {/* Meal Plans Grid */}
          {!isLoading && !error && mealPlans.length > 0 && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {mealPlans.map((plan) => (
                <MealPlanCard
                  key={plan.id}
                  title={plan.title}
                  totalCalories={plan.totalCalories}
                  macros={plan.macros}
                  meals={plan.meals}
                  onViewRecipe={handleViewRecipe}
                  onPrintPlan={() => handlePrintPlan(plan.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}