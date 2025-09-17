import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon, ClockIcon, UsersIcon, TrendingUpIcon } from "lucide-react";

interface DietPlan {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  calories: string;
  imageUrl: string;
  detailedInfo: {
    overview: string;
    mealStructure: string[];
    restrictions: string[];
    nutritionFocus: string[];
    sampleMeals: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
      snacks: string[];
    };
    healthBenefits: string[];
    tips: string[];
  };
}

interface DietDetailModalProps {
  diet: DietPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DietDetailModal = ({ diet, isOpen, onClose }: DietDetailModalProps) => {
  const handlePrint = () => {
    if (!diet) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${diet.title} - Diet Plan</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ddd; padding-bottom: 20px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #333; }
            .meal-category { font-weight: bold; color: #666; margin-top: 15px; }
            .list-item { margin: 5px 0; padding-left: 20px; }
            .benefits { display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0; }
            .benefit-tag { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${diet.title}</h1>
            <p style="font-size: 16px; color: #666;">${diet.description}</p>
            <p style="font-size: 14px; color: #888;">${diet.calories}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Overview</div>
            <p>${diet.detailedInfo.overview}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Key Benefits</div>
            <div class="benefits">
              ${diet.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Nutrition Focus</div>
            ${diet.detailedInfo.nutritionFocus.map(focus => `<div class="list-item">• ${focus}</div>`).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Sample Meal Structure</div>
            <div class="meal-category">Breakfast Options:</div>
            ${diet.detailedInfo.sampleMeals.breakfast.map(meal => `<div class="list-item">• ${meal}</div>`).join('')}
            
            <div class="meal-category">Lunch Options:</div>
            ${diet.detailedInfo.sampleMeals.lunch.map(meal => `<div class="list-item">• ${meal}</div>`).join('')}
            
            <div class="meal-category">Dinner Options:</div>
            ${diet.detailedInfo.sampleMeals.dinner.map(meal => `<div class="list-item">• ${meal}</div>`).join('')}
            
            <div class="meal-category">Snack Options:</div>
            ${diet.detailedInfo.sampleMeals.snacks.map(snack => `<div class="list-item">• ${snack}</div>`).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Health Benefits</div>
            ${diet.detailedInfo.healthBenefits.map(benefit => `<div class="list-item">• ${benefit}</div>`).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Tips for Success</div>
            ${diet.detailedInfo.tips.map(tip => `<div class="list-item">• ${tip}</div>`).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Dietary Restrictions</div>
            ${diet.detailedInfo.restrictions.map(restriction => `<div class="list-item">• ${restriction}</div>`).join('')}
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (!diet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-foreground mb-2">{diet.title}</DialogTitle>
              <p className="text-muted-foreground">{diet.description}</p>
              <Badge variant="secondary" className="mt-2">{diet.calories}</Badge>
            </div>
            <Button onClick={handlePrint} variant="outline" size="sm" className="ml-4">
              <PrinterIcon className="w-4 h-4 mr-2" />
              Print Diet Plan
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={diet.imageUrl}
              alt={diet.title}
              className="w-full h-full object-cover"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {diet.detailedInfo.overview}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUpIcon className="w-5 h-5 mr-2 text-primary" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {diet.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="bg-primary-light text-primary border-primary/20">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diet.detailedInfo.nutritionFocus.map((focus, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {focus}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-primary" />
                Sample Meal Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Breakfast Options</h4>
                <ul className="space-y-1">
                  {diet.detailedInfo.sampleMeals.breakfast.map((meal, index) => (
                    <li key={index} className="text-sm text-muted-foreground ml-4">• {meal}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Lunch Options</h4>
                <ul className="space-y-1">
                  {diet.detailedInfo.sampleMeals.lunch.map((meal, index) => (
                    <li key={index} className="text-sm text-muted-foreground ml-4">• {meal}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Dinner Options</h4>
                <ul className="space-y-1">
                  {diet.detailedInfo.sampleMeals.dinner.map((meal, index) => (
                    <li key={index} className="text-sm text-muted-foreground ml-4">• {meal}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Healthy Snacks</h4>
                <ul className="space-y-1">
                  {diet.detailedInfo.sampleMeals.snacks.map((snack, index) => (
                    <li key={index} className="text-sm text-muted-foreground ml-4">• {snack}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diet.detailedInfo.healthBenefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diet.detailedInfo.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dietary Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {diet.detailedInfo.restrictions.map((restriction, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {restriction}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};