import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Utensils } from "lucide-react";

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

interface MealPlanCardProps {
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
  onViewRecipe: (recipe: Recipe) => void;
  onSelectPlan: () => void;
}

export const MealPlanCard = ({ 
  title, 
  totalCalories, 
  macros, 
  meals, 
  onViewRecipe,
  onSelectPlan 
}: MealPlanCardProps) => {
  const renderMeal = (meal: Recipe, mealType: string) => (
    <div key={meal.id} className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground capitalize">{mealType}</h4>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{meal.readyInMinutes}m</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{meal.servings}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
            {meal.title}
          </h5>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewRecipe(meal)}
            className="h-7 text-xs"
          >
            View Recipe
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 border-0 shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-xl text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete daily meal plan
            </CardDescription>
          </div>
          <Badge className="bg-primary-light text-primary">
            {totalCalories} kcal
          </Badge>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{macros.protein}g</div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{macros.carbs}g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{macros.fat}g</div>
            <div className="text-xs text-muted-foreground">Fat</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {renderMeal(meals.breakfast, "breakfast")}
        <Separator />
        {renderMeal(meals.lunch, "lunch")}
        <Separator />
        {renderMeal(meals.dinner, "dinner")}
        {meals.snack && (
          <>
            <Separator />
            {renderMeal(meals.snack, "snack")}
          </>
        )}

        <div className="pt-4">
          <Button onClick={onSelectPlan} className="w-full" size="lg">
            <Utensils className="h-4 w-4 mr-2" />
            Choose This Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};