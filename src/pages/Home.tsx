import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DietPlanCard } from "@/components/DietPlanCard";
import heroImage from "@/assets/hero-diet-image.jpg";

const dietPlans = [
  {
    id: "ketogenic",
    title: "Ketogenic Diet",
    description: "High-fat, low-carb diet that puts your body into ketosis for rapid fat burning and mental clarity.",
    benefits: ["Rapid Weight Loss", "Mental Clarity", "Stable Energy"],
    calories: "1200-1800 calories",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop"
  },
  {
    id: "vegan",
    title: "Vegan Diet",
    description: "Plant-based nutrition that's rich in fiber, vitamins, and minerals while being environmentally friendly.",
    benefits: ["Heart Health", "Lower Cholesterol", "Environmental Impact"],
    calories: "1400-2000 calories",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
  },
  {
    id: "mediterranean",
    title: "Mediterranean Diet",
    description: "Traditional eating pattern emphasizing whole foods, healthy fats, and moderate wine consumption.",
    benefits: ["Heart Health", "Brain Function", "Longevity"],
    calories: "1500-2200 calories",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop"
  },
  {
    id: "high_protein",
    title: "High Protein Diet",
    description: "Protein-rich meals designed to build muscle, increase metabolism, and maintain satiety.",
    benefits: ["Muscle Building", "Higher Metabolism", "Sustained Fullness"],
    calories: "1600-2400 calories",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop"
  },
  {
    id: "paleo",
    title: "Paleo Diet",
    description: "Whole foods approach based on what our ancestors ate - no processed foods, grains, or dairy.",
    benefits: ["Natural Foods", "Better Digestion", "Stable Blood Sugar"],
    calories: "1400-2100 calories",
    imageUrl: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=600&fit=crop"
  },
  {
    id: "balanced",
    title: "Balanced Diet",
    description: "Well-rounded nutrition with all food groups in healthy proportions for sustainable lifestyle.",
    benefits: ["Sustainable", "All Nutrients", "Flexible"],
    calories: "1500-2200 calories",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop"
  }
];

export default function Home() {
  const navigate = useNavigate();

  const handlePlanSelect = (dietType: string) => {
    navigate("/personalize", { state: { selectedDietType: dietType } });
  };

  const handleGetStarted = () => {
    navigate("/personalize");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">NutriPlan</span>
            </div>
            <Button variant="outline" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Perfect
                  <span className="block text-primary">Diet Plan</span>
                  Awaits
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Get a personalized nutrition plan tailored to your goals, lifestyle, and preferences. 
                  Science-backed recommendations for sustainable results.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" onClick={handleGetStarted} className="w-full sm:w-auto">
                  Create My Plan
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Science-Based</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Personalized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Easy to Follow</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Healthy foods for diet planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm font-medium">1000+ Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Plans Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Preferred Diet Style
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each plan is scientifically designed and can be personalized to match your specific needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dietPlans.map((plan) => (
              <DietPlanCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                benefits={plan.benefits}
                imageUrl={plan.imageUrl}
                calories={plan.calories}
                onSelect={() => handlePlanSelect(plan.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who have achieved their health goals with our personalized diet plans.
            </p>
            <Button size="xl" onClick={handleGetStarted} className="px-12">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-lg"></div>
            <span className="text-lg font-bold text-foreground">NutriPlan</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 NutriPlan. Your personalized path to better health.
          </p>
        </div>
      </footer>
    </div>
  );
}