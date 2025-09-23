import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Utensils } from 'lucide-react';
import { useTranslatedObject } from '@/hooks/useTranslatedContent';
import { TranslatedText } from './TranslatedText';

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
    amount: string;
    unit: string;
  }>;
}

interface TranslatedRecipeCardProps {
  recipe: Recipe;
  onViewRecipe?: (recipe: Recipe) => void;
  onAddToMeal?: (recipe: Recipe) => void;
  sourceLang?: string;
  showNutrition?: boolean;
  className?: string;
}

export function TranslatedRecipeCard({
  recipe,
  onViewRecipe,
  onAddToMeal,
  sourceLang = 'en',
  showNutrition = true,
  className = ''
}: TranslatedRecipeCardProps) {
  // Translate recipe content
  const { translatedObject: translatedRecipe, isLoading } = useTranslatedObject(
    recipe,
    ['title', 'summary', 'instructions'],
    { sourceLang, enabled: true }
  );

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="p-4">
        <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={recipe.image}
            alt={translatedRecipe.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardTitle className="text-lg leading-tight">
          <TranslatedText 
            text={recipe.title} 
            sourceLang={sourceLang}
            showSkeleton={isLoading}
            className="line-clamp-2"
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Recipe Meta Information */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          {recipe.calories && (
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>{recipe.calories} cal</span>
            </div>
          )}
        </div>

        {/* Nutrition Information */}
        {showNutrition && (recipe.protein || recipe.carbs || recipe.fat) && (
          <div className="flex gap-2 mb-4">
            {recipe.protein && (
              <Badge variant="secondary" className="text-xs">
                P: {recipe.protein}g
              </Badge>
            )}
            {recipe.carbs && (
              <Badge variant="secondary" className="text-xs">
                C: {recipe.carbs}g
              </Badge>
            )}
            {recipe.fat && (
              <Badge variant="secondary" className="text-xs">
                F: {recipe.fat}g
              </Badge>
            )}
          </div>
        )}

        {/* Recipe Summary */}
        {recipe.summary && (
          <div className="mb-4">
            <TranslatedText
              text={recipe.summary}
              sourceLang={sourceLang}
              as="p"
              className="text-sm text-muted-foreground line-clamp-3"
              showSkeleton={isLoading}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {onViewRecipe && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewRecipe(translatedRecipe)}
              className="flex-1"
            >
              <TranslatedText text="View Recipe" sourceLang="en" />
            </Button>
          )}
          {onAddToMeal && (
            <Button
              size="sm"
              onClick={() => onAddToMeal(translatedRecipe)}
              className="flex-1"
            >
              <TranslatedText text="Add to Meal" sourceLang="en" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}