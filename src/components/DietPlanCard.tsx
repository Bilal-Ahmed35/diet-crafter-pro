import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DietPlanCardProps {
  title: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  calories: string;
  onSelect: () => void;
}

export const DietPlanCard = ({ 
  title, 
  description, 
  benefits, 
  imageUrl, 
  calories,
  onSelect 
}: DietPlanCardProps) => {
  return (
    <Card 
      className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-md bg-card cursor-pointer group"
      onClick={onSelect}
    >
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-foreground mb-2">{title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {calories}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Key Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-primary-light text-primary border-primary/20"
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="w-full group-hover:bg-primary-dark group-hover:shadow-lg transition-all duration-300"
            size="lg"
          >
            Get Personalized Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};