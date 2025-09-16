import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, ChefHat, Heart } from "lucide-react";

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
  summary?: string;
  instructions?: string;
  ingredients?: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
}

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  // Mock ingredients if not provided
  const mockIngredients = [
    { name: "Main ingredient", amount: 1, unit: "cup" },
    { name: "Secondary ingredient", amount: 2, unit: "tbsp" },
    { name: "Seasoning", amount: 1, unit: "tsp" },
    { name: "Additional ingredient", amount: 200, unit: "g" },
  ];

  const ingredients = recipe.ingredients || mockIngredients;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <DialogTitle className="text-2xl text-foreground mb-2">
              {recipe.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {recipe.summary || "Delicious and nutritious recipe perfect for your meal plan."}
            </DialogDescription>
          </div>

          {/* Recipe Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>{recipe.calories || 350} calories</span>
            </div>
          </div>

          {/* Nutrition Info */}
          {(recipe.protein || recipe.carbs || recipe.fat) && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {recipe.protein || 25}g
                </div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {recipe.carbs || 30}g
                </div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {recipe.fat || 12}g
                </div>
                <div className="text-xs text-muted-foreground">Fat</div>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Ingredients */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Ingredients</h3>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded-lg">
                  <span className="text-foreground">{ingredient.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {ingredient.amount} {ingredient.unit}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Instructions</h3>
            <div className="prose prose-sm text-muted-foreground">
              {recipe.instructions ? (
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
              ) : (
                <div className="space-y-3">
                  <p>1. Prepare all ingredients according to the measurements above.</p>
                  <p>2. Follow your preferred cooking method for this type of dish.</p>
                  <p>3. Cook until properly done and serve according to serving size.</p>
                  <p>4. Enjoy your nutritious and delicious meal!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};